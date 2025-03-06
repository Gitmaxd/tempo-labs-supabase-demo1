"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { createClient } from "../../../../supabase/client";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";

interface ContentFormProps {
  initialData: {
    id?: string;
    title: string;
    content: string;
    excerpt: string;
    status: string;
    author_id: string;
    users: any;
    category?: string;
    tags?: string;
    visibility?: string;
  };
  isEditing?: boolean;
}

export function ContentForm({ initialData, isEditing = false }: ContentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
    excerpt: initialData.excerpt || "",
    status: initialData.status || "draft",
    category: initialData.category || "general",
    tags: initialData.tags || "",
    visibility: initialData.visibility || "public",
    author_id: initialData.author_id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();

      // Validate form data
      if (!formData.title.trim()) {
        toast({
          title: "Error",
          description: "Title is required",
          variant: "destructive",
        });
        return;
      }

      if (!formData.content.trim()) {
        toast({
          title: "Error",
          description: "Content is required",
          variant: "destructive",
        });
        return;
      }

      // Prepare data for submission
      const contentData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || formData.content.substring(0, 150) + "...",
        status: formData.status,
        category: formData.category,
        tags: formData.tags,
        visibility: formData.visibility,
        author_id: formData.author_id,
      };

      let result;
      
      if (isEditing && initialData.id) {
        // Update existing content
        result = await supabase
          .from("content")
          .update(contentData)
          .eq("id", initialData.id);
      } else {
        // Create new content
        result = await supabase.from("content").insert(contentData);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "Success",
        description: isEditing
          ? "Content updated successfully"
          : "Content created successfully",
      });

      // Redirect to content list
      router.push("/dashboard/content");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    // Store the current form data in localStorage for preview
    localStorage.setItem("contentPreview", JSON.stringify(formData));
    window.open("/dashboard/content/preview", "_blank");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/content">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <CardTitle>
                {isEditing ? "Edit Content" : "Content Details"}
              </CardTitle>
            </div>
            <CardDescription>
              {isEditing
                ? "Update your content details"
                : "Enter the details for your new content"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter content title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                placeholder="Brief summary of the content"
                className="resize-none"
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Enter the main content here..."
                className="min-h-[300px]"
                value={formData.content}
                onChange={handleChange}
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
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
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
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="Enter tags separated by commas"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreview}
              disabled={isLoading}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update"
                : "Create"}
            </Button>
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
                  value="public"
                  className="h-4 w-4 rounded-full"
                  checked={formData.visibility === "public"}
                  onChange={handleChange}
                />
                <Label htmlFor="public">Public (Everyone)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="registered"
                  name="visibility"
                  value="registered"
                  className="h-4 w-4 rounded-full"
                  checked={formData.visibility === "registered"}
                  onChange={handleChange}
                />
                <Label htmlFor="registered">Registered Users Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="private"
                  name="visibility"
                  value="private"
                  className="h-4 w-4 rounded-full"
                  checked={formData.visibility === "private"}
                  onChange={handleChange}
                />
                <Label htmlFor="private">Private (Admins Only)</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 