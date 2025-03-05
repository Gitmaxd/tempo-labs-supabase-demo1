import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Shield, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canAccessAdminPanel } from "@/lib/roles";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RoleBadge from "@/components/role-badge";

export default async function RolesManagementPage() {
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

  // Get all roles
  const { data: roles, error: rolesError } = await supabase
    .from("roles")
    .select("*")
    .order("id");

  if (rolesError) {
    console.error("Error fetching roles:", rolesError);
  }

  // Get user counts by role
  const roleCounts = {};

  for (const role of roles || []) {
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role_id", role.id);

    roleCounts[role.id] = count || 0;
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
          <h1 className="text-3xl font-bold">Role Management</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>System Roles</CardTitle>
                <CardDescription>
                  Manage the roles available in the system
                </CardDescription>
              </div>
              <Button>
                <Shield className="mr-2 h-4 w-4" />
                Add New Role
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          ID
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Role
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Description
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Users
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {roles &&
                        roles.map((role) => (
                          <tr
                            key={role.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{role.id}</td>
                            <td className="p-4 align-middle">
                              <RoleBadge role={role.name} />
                            </td>
                            <td className="p-4 align-middle">
                              {role.description || "No description"}
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{roleCounts[role.id] || 0}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}

                      {(!roles || roles.length === 0) && (
                        <tr>
                          <td
                            colSpan={5}
                            className="p-4 text-center text-muted-foreground"
                          >
                            No roles found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure what each role can access in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Permission
                        </th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                          Admin
                        </th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                          Editor
                        </th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                          User
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">Access Admin Panel</td>
                        <td className="p-4 align-middle text-center">✅</td>
                        <td className="p-4 align-middle text-center">❌</td>
                        <td className="p-4 align-middle text-center">❌</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">Manage Users</td>
                        <td className="p-4 align-middle text-center">✅</td>
                        <td className="p-4 align-middle text-center">❌</td>
                        <td className="p-4 align-middle text-center">❌</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">Edit Content</td>
                        <td className="p-4 align-middle text-center">✅</td>
                        <td className="p-4 align-middle text-center">✅</td>
                        <td className="p-4 align-middle text-center">❌</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">View Content</td>
                        <td className="p-4 align-middle text-center">✅</td>
                        <td className="p-4 align-middle text-center">✅</td>
                        <td className="p-4 align-middle text-center">✅</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">Manage Own Profile</td>
                        <td className="p-4 align-middle text-center">✅</td>
                        <td className="p-4 align-middle text-center">✅</td>
                        <td className="p-4 align-middle text-center">✅</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
