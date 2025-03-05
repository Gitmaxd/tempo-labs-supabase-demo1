import DashboardNavbar from "@/components/dashboard-navbar";
import {
  InfoIcon,
  UserCircle,
  Shield,
  Edit,
  User as UserIcon,
  BarChart3,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import RoleBadge from "@/components/role-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
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
    .select("*, roles(name, description)")
    .eq("id", user.id)
    .single();

  if (userError) {
    console.error("Error fetching user data:", userError);
  }

  const userRole = userData?.roles?.name || null;
  const roleDescription = userData?.roles?.description || "Basic user access";

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              {userRole && <RoleBadge role={userRole} size="lg" />}
            </div>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                This is a protected page only visible to authenticated users
              </span>
            </div>
          </header>

          {/* User Profile Section */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">
                  {userData?.full_name || "User Profile"}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Role Information</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <strong className="text-sm">Current Role:</strong>
                    <RoleBadge role={userRole} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {roleDescription}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Account Information
                </h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{userData?.full_name || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Joined:</span>
                      <span>
                        {new Date(
                          userData?.created_at || "",
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Available Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userRole === "admin" && (
                  <>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          Admin Panel
                        </CardTitle>
                        <CardDescription>
                          Manage users and system settings
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href="/dashboard/admin">
                          <Button className="w-full">Access Admin Panel</Button>
                        </Link>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          Analytics Dashboard
                        </CardTitle>
                        <CardDescription>
                          View system analytics and metrics
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href="/dashboard/analytics">
                          <Button className="w-full" variant="outline">
                            View Analytics
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </>
                )}

                {(userRole === "admin" || userRole === "editor") && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Edit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        Content Management
                      </CardTitle>
                      <CardDescription>Create and edit content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/dashboard/content">
                        <Button className="w-full" variant="outline">
                          Manage Content
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Profile Settings
                    </CardTitle>
                    <CardDescription>
                      Update your profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/dashboard/profile">
                      <Button className="w-full" variant="outline">
                        Edit Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8 bg-muted/50 rounded-lg p-4 overflow-hidden">
              <h3 className="text-lg font-medium mb-2">Debug Information</h3>
              <pre className="text-xs font-mono max-h-48 overflow-auto">
                {JSON.stringify({ user, userData }, null, 2)}
              </pre>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
