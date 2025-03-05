import { createClient } from "../../../../supabase/server";
import { NextResponse } from "next/server";
import { canManageUsers } from "@/lib/roles";

export async function GET() {
  const supabase = await createClient();

  // Check if user is authenticated and has admin role
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

  // Check if user can manage users
  if (!canManageUsers(userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Get all roles
  const { data: roles, error } = await supabase.from("roles").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ roles });
}

export async function PUT(request: Request) {
  const supabase = await createClient();

  // Check if user is authenticated and has admin role
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

  // Check if user can manage users
  if (!canManageUsers(userRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { userId, roleId } = await request.json();

    if (!userId || !roleId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Update user's role
    const { error } = await supabase
      .from("users")
      .update({ role_id: roleId })
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
