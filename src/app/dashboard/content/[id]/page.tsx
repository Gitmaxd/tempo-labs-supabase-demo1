import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { ArrowLeft, Calendar, User, Tag, Edit, Eye, FileText, Globe, FolderOpen } from "lucide-react";
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
import { DeleteButton } from "../client-components";

interface ContentUser {
  id: string;
  full_name: string | null;
  email: string;
}

interface Content {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  status: string;
  visibility: string;
  category: string | null;
  views: number;
  created_at: string;
  tags: string[];
  author_id: string;
  users: ContentUser;
}

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
    .select("*")
    .eq("id", contentId)
    .single() as { data: Content | null; error: Error | null };

  if (contentError) {
    console.error("Error fetching content:", contentError);
    return (
      <>
        <DashboardNavbar />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Error</h2>
            <p className="text-red-500 dark:text-red-300">
              Failed to load content: {contentError.message}
            </p>
          </div>
        </main>
      </>
    );
  }

  if (!contentData) {
    return redirect("/dashboard/content");
  }
  
  // Get user information for the content author
  const { data: authorData, error: authorError } = await supabase
    .from("users")
    .select("id, full_name, email")
    .eq("id", contentData.author_id)
    .single();
    
  if (authorError) {
    console.error("Error fetching user data:", authorError);
  }
  
  // Combine content with user data
  const contentWithUser: Content = {
    ...contentData,
    users: authorData || { id: "", full_name: "Unknown", email: "" }
  };

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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600 dark:text-white" />
            <h1 className="text-3xl font-bold">{contentWithUser.title}</h1>
          </div>
          <div className="flex gap-2">
            <Link href={`/dashboard/content/edit/${contentWithUser.id}`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Content
              </Button>
            </Link>
            <DeleteButton id={parseInt(contentWithUser.id)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Preview</CardTitle>
                <CardDescription>
                  How the content appears to users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: contentWithUser.content || "" }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Raw Content</CardTitle>
                <CardDescription>HTML content source</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs">
                  {contentWithUser.content || ""}
                </pre>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Created:{" "}
                    {new Date(contentWithUser.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Status:{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        contentWithUser.status === "published"
                          ? "bg-green-100 text-green-800 dark:bg-zinc-900 dark:text-white"
                          : "bg-amber-100 text-amber-800 dark:bg-zinc-900 dark:text-white"
                      }`}
                    >
                      {contentWithUser.status.charAt(0).toUpperCase() +
                        contentWithUser.status.slice(1)}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Author: {contentWithUser.users.full_name || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {contentWithUser.views || 0} Views
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Visibility:{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        contentWithUser.visibility === "public"
                          ? "bg-blue-100 text-blue-800 dark:bg-zinc-900 dark:text-white"
                          : contentWithUser.visibility === "registered"
                          ? "bg-purple-100 text-purple-800 dark:bg-zinc-900 dark:text-white"
                          : "bg-gray-100 text-gray-800 dark:bg-zinc-900 dark:text-white"
                      }`}
                    >
                      {contentWithUser.visibility.charAt(0).toUpperCase() +
                        contentWithUser.visibility.slice(1)}
                    </span>
                  </span>
                </div>
                {contentWithUser.category && (
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Category: {contentWithUser.category}
                    </span>
                  </div>
                )}
                {contentWithUser.tags && contentWithUser.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {contentWithUser.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/dashboard/content/edit/${contentWithUser.id}`} className="w-full">
                  <Button className="w-full" variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Content
                  </Button>
                </Link>
                <DeleteButton id={parseInt(contentWithUser.id)} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
