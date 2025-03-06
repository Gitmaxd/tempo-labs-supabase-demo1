import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { ContentForm } from "../content-form";
import DashboardNavbar from "@/components/dashboard-navbar";

export default async function NewContentPage() {
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

  const initialData = {
    title: "",
    content: "",
    excerpt: "",
    status: "draft",
    author_id: user.id,
    users: userData
  };

  return (
    <>
      <DashboardNavbar />
      <div className="container mx-auto py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Create New Content</h1>
          <p className="text-muted-foreground">
            Create and publish new content
          </p>
        </div>
        <ContentForm initialData={initialData} />
      </div>
    </>
  );
}
