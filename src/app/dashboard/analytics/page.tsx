import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Eye,
} from "lucide-react";
import { canAccessAdminPanel } from "@/lib/roles";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AnalyticsDashboard() {
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

  if (userError) {
    console.error("Error fetching user data:", userError);
    return redirect("/dashboard");
  }

  const userRole = userData.roles?.name || null;

  // Check if user has admin access
  if (!canAccessAdminPanel(userRole)) {
    return redirect("/dashboard");
  }

  // Get statistics
  const { count: totalUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: totalContent } = await supabase
    .from("content")
    .select("*", { count: "exact", head: true });

  const { data: publishedContent } = await supabase
    .from("content")
    .select("id")
    .eq("status", "published");

  const { data: draftContent } = await supabase
    .from("content")
    .select("id")
    .eq("status", "draft");

  // Get recent content
  const { data: recentContent } = await supabase
    .from("content")
    .select("*, users!inner(full_name)")
    .order("created_at", { ascending: false })
    .limit(5);

  // Get top viewed content
  const { data: topContent } = await supabase
    .from("content")
    .select("id, title, views")
    .order("views", { ascending: false })
    .limit(5);

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="h-8 w-8 text-blue-600 dark:text-white" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                {totalUsers || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center">
                <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                {totalContent || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
                {publishedContent?.length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Draft Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600 dark:text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                {draftContent?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content Analytics</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Content</CardTitle>
                  <CardDescription>
                    The most recently created content items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentContent && recentContent.length > 0 ? (
                      recentContent.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center border-b pb-2 last:border-0"
                        >
                          <div>
                            <p className="font-medium truncate max-w-[250px]">
                              {item.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              By {item.users?.full_name || "Unknown"}
                            </p>
                          </div>
                          <div className="text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${item.status === "published" ? "bg-green-100 text-green-800 dark:bg-zinc-900 dark:text-white" : "bg-amber-100 text-amber-800 dark:bg-zinc-900 dark:text-white"}`}
                            >
                              {item.status.charAt(0).toUpperCase() +
                                item.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        No content found
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Content</CardTitle>
                  <CardDescription>Content with the most views</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topContent && topContent.length > 0 ? (
                      topContent.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center border-b pb-2 last:border-0"
                        >
                          <p className="font-medium truncate max-w-[250px]">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-1 text-sm">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span>{item.views || 0}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        No content found
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>
                  Key metrics for your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">
                      Analytics visualization would be displayed here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Showing data for the last 30 days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>
                  View metrics for all content items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">
                      Content performance chart would be displayed here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Showing views, engagement, and publishing trends
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Track user registrations over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">
                      User growth chart would be displayed here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Showing registrations and active users over time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
