import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canEditContent } from "@/lib/roles";
import Link from "next/link";
import { PreviewButton, UpdateContentButton } from "../../client-components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function EditContentPage({
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

  // Check if user can edit content
  if (!canEditContent(userRole)) {
    return redirect("/dashboard");
  }

  // Get content from database
  const { data: contentData, error: contentError } = await supabase
    .from("content")
    .select("*, users!content_author_id_fkey(full_name, email)")
    .eq("id", contentId)
    .single();

  if (contentError) {
    console.error("Error fetching content:", contentError);
    return redirect("/dashboard/content");
  }

  if (!contentData) {
    return redirect("/dashboard/content");
  }

  // Check if user is admin or content author
  if (userRole !== "admin" && contentData.author_id !== user.id) {
    return redirect("/dashboard/content");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href={`/dashboard/content/${contentId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Content</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
                <CardDescription>
                  Edit the details for your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter content title"
                    defaultValue={contentData.title}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary of the content"
                    className="resize-none"
                    rows={3}
                    defaultValue={contentData.excerpt || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter the main content here..."
                    className="min-h-[200px]"
                    defaultValue={
                      contentData.content
                        ? contentData.content.replace(/<[^>]*>/g, "")
                        : ""
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Publishing Options</CardTitle>
                <CardDescription>
                  Configure how this content will be published
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={contentData.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    defaultValue={
                      contentData.category?.toLowerCase() || "general"
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="documentation">
                        Documentation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags separated by commas"
                    defaultValue={
                      contentData.tags ? contentData.tags.join(", ") : ""
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <PreviewButton />
                <UpdateContentButton
                  contentId={contentData.id}
                  initialStatus={contentData.status}
                  initialCategory={contentData.category}
                  initialVisibility={contentData.visibility}
                />
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Permissions</CardTitle>
                <CardDescription>Who can view this content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="public"
                      name="visibility"
                      className="h-4 w-4 rounded-full"
                      defaultChecked={contentData.visibility === "public"}
                    />
                    <Label htmlFor="public">Public (Everyone)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="registered"
                      name="visibility"
                      className="h-4 w-4 rounded-full"
                      defaultChecked={contentData.visibility === "registered"}
                    />
                    <Label htmlFor="registered">Registered Users Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="private"
                      name="visibility"
                      className="h-4 w-4 rounded-full"
                      defaultChecked={contentData.visibility === "private"}
                    />
                    <Label htmlFor="private">Private (Admins Only)</Label>
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
