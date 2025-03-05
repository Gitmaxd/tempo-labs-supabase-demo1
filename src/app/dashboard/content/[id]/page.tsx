import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { ArrowLeft, Calendar, User, Tag, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canEditContent } from "@/lib/roles";
import Link from "next/link";
import { PreviewButton, PublishButton } from "../client-components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ContentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const contentId = params.id;
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

  // Check if user can view content
  if (!canEditContent(userRole)) {
    return redirect("/dashboard");
  }

  // Get content from database
  const { data: contentData, error: contentError } = await supabase
    .from("content")
    .select("*, users!inner(full_name, email)")
    .eq("id", contentId)
    .single();

  if (contentError) {
    console.error("Error fetching content:", contentError);
    return redirect("/dashboard/content");
  }

  if (!contentData) {
    return redirect("/dashboard/content");
  }

  // Increment view count
  const { error: updateError } = await supabase
    .from("content")
    .update({ views: (contentData.views || 0) + 1 })
    .eq("id", contentId);

  if (updateError) {
    console.error("Error updating view count:", updateError);
  }

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard/content">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Content Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      {contentData.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {contentData.excerpt}
                    </CardDescription>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${contentData.status === "published" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"}`}
                  >
                    {contentData.status.charAt(0).toUpperCase() +
                      contentData.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: contentData.content || "",
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="flex gap-4">
                  <PreviewButton />
                  <Link href={`/dashboard/content/edit/${contentId}`}>
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                </div>
                <PublishButton />
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Content Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Published:{" "}
                    {new Date(contentData.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Author: {contentData.users?.full_name || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {contentData.views || 0} Views
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Category: {contentData.category || "Uncategorized"}
                  </span>
                </div>
                {contentData.tags && contentData.tags.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {contentData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${contentData.status === "published" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"}`}
                    >
                      {contentData.status.charAt(0).toUpperCase() +
                        contentData.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Visibility</span>
                    <span className="text-sm font-medium">
                      {contentData.visibility.charAt(0).toUpperCase() +
                        contentData.visibility.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">URL</span>
                    <span className="text-sm text-muted-foreground">
                      /content/{contentId}
                    </span>
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
