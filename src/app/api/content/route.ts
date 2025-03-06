import { createClient } from "../../../../supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's role
  const { data: userData } = await supabase
    .from("users")
    .select("*, roles(name)")
    .eq("id", user.id)
    .single();

  const userRole = userData?.roles?.name || null;

  // Build query
  let query = supabase
    .from("content")
    .select("*");

  // Apply filters
  if (id) {
    query = query.eq("id", id);
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (status) {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  // Execute query
  const { data: contentItems, error: contentError } = await query;

  if (contentError) {
    return NextResponse.json({ error: contentError.message }, { status: 500 });
  }

  // If we have content items, fetch the user information
  if (contentItems && contentItems.length > 0) {
    // Get all unique author IDs
    const authorIds = Array.from(new Set(contentItems.map(item => item.author_id)));
    
    // Fetch user information for these authors
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("id, full_name, email")
      .in("id", authorIds);
      
    if (usersError) {
      console.error("Error fetching users:", usersError);
      return NextResponse.json({ error: usersError.message }, { status: 500 });
    }
    
    // Create a map of user IDs to user data for quick lookup
    const userMap: Record<string, any> = {};
    usersData?.forEach(user => {
      userMap[user.id] = user;
    });
    
    // Combine content with user data
    const contentWithUsers = contentItems.map(item => ({
      ...item,
      users: userMap[item.author_id] || { full_name: "Unknown", email: "" }
    }));
    
    return NextResponse.json({ content: id ? contentWithUsers[0] : contentWithUsers });
  }

  return NextResponse.json({ content: id ? contentItems[0] : contentItems });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's role
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const userRole = userData?.role || "user";

  try {
    const contentData = await request.json();

    // Validate required fields
    if (!contentData.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Process tags if they come as a comma-separated string
    if (typeof contentData.tags === "string") {
      contentData.tags = contentData.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(Boolean);
    }

    // Add author_id and timestamps
    const newContent = {
      ...contentData,
      author_id: user.id,
      updated_at: new Date().toISOString(),
    };

    // Insert new content
    const { data, error } = await supabase
      .from("content")
      .insert(newContent)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, content: data[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 },
    );
  }
}

export async function PUT(request: Request) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's role
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const userRole = userData?.role || "user";

  try {
    const { id, ...contentData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 },
      );
    }

    // Process tags if they come as a comma-separated string
    if (typeof contentData.tags === "string") {
      contentData.tags = contentData.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(Boolean);
    }

    // Add updated_at timestamp
    const updatedContent = {
      ...contentData,
      updated_at: new Date().toISOString(),
    };

    // Get the existing content to check ownership
    const { data: existingContent, error: fetchError } = await supabase
      .from("content")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // Check if user is authorized to update this content
    if (existingContent.author_id !== user.id && userRole !== "admin") {
      return NextResponse.json(
        { error: "Not authorized to update this content" },
        { status: 403 },
      );
    }

    // Update content
    const { data, error } = await supabase
      .from("content")
      .update(updatedContent)
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, content: data[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Content ID is required" },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's role
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const userRole = userData?.role || "user";

  // Get the content to check ownership
  const { data: existingContent, error: fetchError } = await supabase
    .from("content")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  // Check if user is authorized to delete this content
  if (existingContent.author_id !== user.id && userRole !== "admin") {
    return NextResponse.json(
      { error: "Not authorized to delete this content" },
      { status: 403 }
    );
  }

  // Delete content
  const { error } = await supabase.from("content").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
