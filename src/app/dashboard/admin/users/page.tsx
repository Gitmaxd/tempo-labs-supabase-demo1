import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Shield, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleBadge from "@/components/role-badge";
import { ROLES, canAccessAdminPanel } from "@/lib/roles";
import Link from "next/link";

interface Role {
  id: number;
  name: string;
}

interface User {
  id: string;
  full_name: string | null;
  name: string | null;
  email: string;
  created_at: string;
  roles: Role | null;
}

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get user with role
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*, roles(name)")
    .eq("id", user.id)
    .single();

  if (userError || !userData) {
    console.error("Error fetching user data:", userError);
    return redirect("/dashboard");
  }

  const userRole = userData.roles?.name || null;

  // Check if user has admin access
  if (!canAccessAdminPanel(userRole)) {
    return redirect("/dashboard");
  }

  // Get all users with their roles
  const { data: allUsers, error: usersError } = await supabase
    .from("users")
    .select("id, full_name, name, email, created_at, roles(id, name)")
    .order("created_at", { ascending: false }) as { data: User[] | null; error: Error | null };

  if (usersError) {
    console.error("Error fetching users:", usersError);
  }

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Shield className="h-8 w-8 text-purple-600 dark:text-white" />
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>

        <div className="rounded-md border bg-card">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Role
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Joined
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {allUsers &&
                  allUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        {user.full_name || user.name || "Unnamed User"}
                      </td>
                      <td className="p-4 align-middle">{user.email}</td>
                      <td className="p-4 align-middle">
                        <RoleBadge role={user.roles?.name || null} />
                      </td>
                      <td className="p-4 align-middle">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Link href={`/dashboard/admin/users/${user.id}`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}

                {(!allUsers || allUsers.length === 0) && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-4 text-center text-muted-foreground"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
