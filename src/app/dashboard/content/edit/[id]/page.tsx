import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";
import { ContentForm } from "../../content-form";
import DashboardNavbar from "@/components/dashboard-navbar";

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
    redirect("/login");
  }

  // Get user profile
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (userError) {
    console.error("Error fetching user data:", userError);
    return <div>Error loading user data</div>;
  }

  const userRole = userData?.role || "user";

  // Fetch content data
  const { data: contentData, error: contentError } = await supabase
    .from("content")
    .select("*")
    .eq("id", contentId)
    .single();

  if (contentError) {
    console.error("Error fetching content:", contentError);
    return <div>Error loading content</div>;
  }

  // Check if user is authorized to edit this content
  if (contentData.author_id !== user.id && userRole !== "admin") {
    console.log("User not authorized to edit this content");
    redirect("/dashboard/content");
  }

  // Fetch author data
  const { data: authorData, error: authorError } = await supabase
    .from("users")
    .select("id, full_name, email")
    .eq("id", contentData.author_id)
    .single();

  if (authorError) {
    console.error("Error fetching author data:", authorError);
  }

  // Combine content with author data
  const contentWithUser = {
    ...contentData,
    users: authorData || { full_name: "Unknown", email: "" }
  };

  return (
    <>
      <DashboardNavbar />
      <div className="container mx-auto py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Edit Content</h1>
          <p className="text-muted-foreground">
            Update your content
          </p>
        </div>
        <ContentForm initialData={contentWithUser} isEditing={true} />
      </div>
    </>
  );
}
