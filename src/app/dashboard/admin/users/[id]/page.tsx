import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Shield, ArrowLeft, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleBadge from "@/components/role-badge";
import { canAccessAdminPanel } from "@/lib/roles";
import Link from "next/link";
import UserRoleSelector from "@/components/user-role-selector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const userId = params.id;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get admin user with role
  const { data: adminData, error: adminError } = await supabase
    .from("users")
    .select("*, roles(name)")
    .eq("id", user.id)
    .single();

  if (adminError || !adminData) {
    console.error("Error fetching admin data:", adminError);
    return redirect("/dashboard");
  }

  const adminRole = adminData.roles?.name || null;

  // Check if user has admin access
  if (!canAccessAdminPanel(adminRole)) {
    return redirect("/dashboard");
  }

  // Get target user data
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*, roles(id, name, description)")
    .eq("id", userId)
    .single();

  if (userError || !userData) {
    console.error("Error fetching user data:", userError);
    return redirect("/dashboard/admin/users");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard/admin/users">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Shield className="h-8 w-8 text-purple-600 dark:text-white" />
          <h1 className="text-3xl font-bold">User Details</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Basic user information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                    <UserCircle className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">
                      {userData.full_name || userData.name || "Unnamed User"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {userData.email}
                    </p>
                    <div className="mt-2">
                      <RoleBadge
                        role={userData.roles?.name || null}
                        size="lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">User ID</h3>
                    <p className="text-xs text-muted-foreground break-all bg-muted p-2 rounded">
                      {userData.id}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Joined</h3>
                    <p className="text-sm">
                      {new Date(userData.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Last Updated</h3>
                    <p className="text-sm">
                      {userData.updated_at
                        ? new Date(userData.updated_at).toLocaleDateString()
                        : "Never"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>
                  Change user's role and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Current Role</h3>
                    <div className="flex items-center gap-2">
                      <RoleBadge role={userData.roles?.name || null} />
                      <span className="text-sm text-muted-foreground">
                        {userData.roles?.description ||
                          "No description available"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Change Role</h3>
                    <UserRoleSelector
                      userId={userData.id}
                      currentRoleId={userData.roles?.id || null}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>Manage user account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="justify-start">
                      Reset Password
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Send Verification Email
                    </Button>
                    <Button variant="destructive" className="justify-start">
                      Disable Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
