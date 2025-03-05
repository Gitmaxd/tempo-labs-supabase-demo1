import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Edit, Plus, FileText, Eye } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./client-components";
import { Button } from "@/components/ui/button";
import { canEditContent } from "@/lib/roles";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function ContentManagementPage() {
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
  const { data: contentItems, error: contentError } = await supabase
    .from("content")
    .select("*, users!inner(full_name, email)")
    .order("created_at", { ascending: false });

  if (contentError) {
    console.error("Error fetching content:", contentError);
  }

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Edit className="h-8 w-8 text-blue-600 dark:text-white" />
            <h1 className="text-3xl font-bold">Content Management</h1>
          </div>
          <Link href="/dashboard/content/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Content
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Content</CardTitle>
            <CardDescription>Find and filter content items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Search by title or content..."
                className="max-w-sm"
              />
              <Button variant="secondary">Search</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          {contentItems && contentItems.length > 0 ? (
            contentItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${item.status === "published" ? "bg-green-100 text-green-800 dark:bg-zinc-900 dark:text-white" : "bg-amber-100 text-amber-800 dark:bg-zinc-900 dark:text-white"}`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                    <div className="text-sm text-muted-foreground">
                      Author: {item.users?.full_name || "Unknown"}
                    </div>
                  </div>
                  <div className="flex md:flex-col justify-end p-4 md:p-6 bg-muted/20 border-t md:border-t-0 md:border-l">
                    <Link href={`/dashboard/content/${item.id}`}>
                      <Button variant="ghost" size="sm" className="mb-2">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/content/edit/${item.id}`}>
                      <Button variant="ghost" size="sm" className="mb-2">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <DeleteButton id={item.id} />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No content found</h3>
              <p className="text-muted-foreground mb-6">
                Get started by creating your first content item
              </p>
              <Link href="/dashboard/content/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Content
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
