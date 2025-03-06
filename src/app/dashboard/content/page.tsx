import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import DashboardNavbar from "@/components/dashboard-navbar";

// Define types for our data
interface User {
  id: string;
  full_name: string;
  email: string;
}

interface ContentItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  status: string;
  created_at: string;
  author_id: string;
  users?: User;
}

// Content item component
const ContentItem = ({ item, userRole, userId }: { 
  item: ContentItem; 
  userRole: string; 
  userId: string;
}) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              item.status === "published" 
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" 
                : "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
            }`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-muted-foreground mb-4">{item.excerpt || item.content.substring(0, 100)}</p>
          <div className="text-sm text-muted-foreground">
            Author: {item.users?.full_name || "Unknown"}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link href={`/dashboard/content/${item.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
            View
          </Link>
          <Link href={`/dashboard/content/edit/${item.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default async function ContentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const userRole = profile?.role || "user";
  console.log("User role:", userRole);

  // Fetch content items
  const { data: contentItems, error: contentError } = await supabase
    .from("content")
    .select("*")
    .order("created_at", { ascending: false });

  if (contentError) {
    console.error("Error fetching content:", contentError);
    return <div>Error loading content</div>;
  }

  console.log("Content items fetched:", contentItems?.length || 0);

  // If we have content items, fetch the user information
  let contentWithUsers: ContentItem[] = [];
  if (contentItems && contentItems.length > 0) {
    // Get all unique author IDs
    const authorIds = Array.from(new Set(contentItems.map((item: any) => item.author_id)));
    
    console.log("Author IDs to fetch:", authorIds);
    
    // Fetch user information for these authors
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("id, full_name, email")
      .in("id", authorIds);
      
    if (usersError) {
      console.error("Error fetching users:", usersError);
      return <div>Error loading user data</div>;
    }
    
    console.log("Users data fetched:", usersData?.length || 0);
    
    // Create a map of user IDs to user data for quick lookup
    const userMap: Record<string, User> = {};
    usersData?.forEach((user: User) => {
      userMap[user.id] = user;
    });
    
    // Combine content with user data
    contentWithUsers = contentItems.map((item: any) => ({
      ...item,
      users: userMap[item.author_id] || { id: "", full_name: "Unknown", email: "" }
    }));
  } else {
    contentWithUsers = contentItems || [];
  }

  console.log("Content with users:", contentWithUsers.length);

  return (
    <>
      <DashboardNavbar />
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content</h1>
            <p className="text-muted-foreground">
              Manage your content and publications
            </p>
          </div>
          <Link
            href="/dashboard/content/new"
            className={buttonVariants({ size: "sm" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Content
          </Link>
        </div>

        {contentWithUsers.length === 0 ? (
          <div className="text-center p-12 border rounded-lg">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No content yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first content to get started.
            </p>
            <Link
              href="/dashboard/content/new"
              className={buttonVariants({ size: "sm" })}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Content
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {contentWithUsers.map((item) => (
              <ContentItem
                key={item.id}
                item={item}
                userRole={userRole}
                userId={user.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
