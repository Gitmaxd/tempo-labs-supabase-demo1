"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Eye, Save } from "lucide-react";

export function DeleteButton({ id }: { id: number }) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this content?")) {
      const res = await fetch(`/api/content?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete content");
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-destructive hover:text-destructive"
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      Delete
    </Button>
  );
}

export function PreviewButton() {
  return (
    <Button variant="outline">
      <Eye className="mr-2 h-4 w-4" />
      Preview
    </Button>
  );
}

export function PublishButton() {
  return (
    <Button>
      <Save className="mr-2 h-4 w-4" />
      Publish Changes
    </Button>
  );
}

export function SaveContentButton() {
  const handleSave = async () => {
    const title = (document.getElementById("title") as HTMLInputElement)?.value;
    const excerpt = (document.getElementById("excerpt") as HTMLTextAreaElement)
      ?.value;
    const content = (document.getElementById("content") as HTMLTextAreaElement)
      ?.value;
    const status =
      document
        .querySelector('[data-value="status"]')
        ?.getAttribute("data-value") || "draft";
    const category =
      document
        .querySelector('[data-value="category"]')
        ?.getAttribute("data-value") || "general";
    const tags = (document.getElementById("tags") as HTMLInputElement)?.value;

    const visibility =
      document.querySelector('input[name="visibility"]:checked')?.id ||
      "public";

    if (!title) {
      alert("Title is required");
      return;
    }

    const contentData = {
      title,
      excerpt,
      content,
      status,
      category,
      tags: tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      visibility,
    };

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = `/dashboard/content/${result.content.id}`;
      } else {
        alert(`Error: ${result.error || "Failed to save content"}`);
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("An error occurred while saving content");
    }
  };

  return (
    <Button onClick={handleSave}>
      <Save className="mr-2 h-4 w-4" />
      Save Content
    </Button>
  );
}

interface UpdateContentButtonProps {
  contentId: number;
  initialStatus: string;
  initialCategory: string | null;
  initialVisibility: string;
}

export function UpdateContentButton({
  contentId,
  initialStatus,
  initialCategory,
  initialVisibility,
}: UpdateContentButtonProps) {
  const handleUpdate = async () => {
    const title = (document.getElementById("title") as HTMLInputElement)?.value;
    const excerpt = (document.getElementById("excerpt") as HTMLTextAreaElement)
      ?.value;
    const content = (document.getElementById("content") as HTMLTextAreaElement)
      ?.value;
    const status =
      document
        .querySelector('[data-value="status"]')
        ?.getAttribute("data-value") || initialStatus;
    const category =
      document
        .querySelector('[data-value="category"]')
        ?.getAttribute("data-value") || initialCategory;
    const tags = (document.getElementById("tags") as HTMLInputElement)?.value;

    const visibility =
      document.querySelector('input[name="visibility"]:checked')?.id ||
      initialVisibility;

    if (!title) {
      alert("Title is required");
      return;
    }

    const updatedContent = {
      id: contentId,
      title,
      excerpt,
      content,
      status,
      category,
      tags: tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      visibility,
    };

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContent),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = `/dashboard/content/${contentId}`;
      } else {
        alert(`Error: ${result.error || "Failed to update content"}`);
      }
    } catch (error) {
      console.error("Error updating content:", error);
      alert("An error occurred while updating content");
    }
  };

  return (
    <Button onClick={handleUpdate}>
      <Save className="mr-2 h-4 w-4" />
      Save Changes
    </Button>
  );
}
