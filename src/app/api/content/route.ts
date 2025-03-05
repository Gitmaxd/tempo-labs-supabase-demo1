import { createClient } from "../../../../supabase/server";
import { NextResponse } from "next/server";
import { canEditContent } from "@/lib/roles";

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
    .select("*, users!inner(full_name, email)");

  // Apply filters
  if (id) {
    query = query.eq("id", id);
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (status && canEditContent(userRole)) {
    query = query.eq("status", status);
  } else {
    // Non-editors can only see published content
    query = query.eq("status", "published");
  }

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`,
    );
  }

  // Order by created_at
  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ content: data });
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
    .select("*, roles(name)")
    .eq("id", user.id)
    .single();

  const userRole = userData?.roles?.name || null;

  // Check if user can edit content
  if (!canEditContent(userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

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
    .select("*, roles(name)")
    .eq("id", user.id)
    .single();

  const userRole = userData?.roles?.name || null;

  // Check if user can edit content
  if (!canEditContent(userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

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

    // Check if user is admin or the content author
    if (userRole !== "admin") {
      const { data: existingContent } = await supabase
        .from("content")
        .select("author_id")
        .eq("id", id)
        .single();

      if (!existingContent || existingContent.author_id !== user.id) {
        return NextResponse.json(
          { error: "You can only edit your own content" },
          { status: 403 },
        );
      }
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
    .select("*, roles(name)")
    .eq("id", user.id)
    .single();

  const userRole = userData?.roles?.name || null;

  // Check if user can edit content
  if (!canEditContent(userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Check if user is admin or the content author
  if (userRole !== "admin") {
    const { data: existingContent } = await supabase
      .from("content")
      .select("author_id")
      .eq("id", id)
      .single();

    if (!existingContent || existingContent.author_id !== user.id) {
      return NextResponse.json(
        { error: "You can only delete your own content" },
        { status: 403 },
      );
    }
  }

  // Delete content
  const { error } = await supabase.from("content").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
