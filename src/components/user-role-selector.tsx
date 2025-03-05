"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "../../supabase/client";

interface Role {
  id: number;
  name: string;
  description: string | null;
}

interface UserRoleSelectorProps {
  userId: string;
  currentRoleId: number | null;
  onRoleChange?: (roleId: number) => void;
}

export default function UserRoleSelector({
  userId,
  currentRoleId,
  onRoleChange,
}: UserRoleSelectorProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(
    currentRoleId,
  );
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchRoles() {
      const { data, error } = await supabase
        .from("roles")
        .select("*")
        .order("id");

      if (error) {
        console.error("Error fetching roles:", error);
        return;
      }

      if (data) {
        setRoles(data);
      }
    }

    fetchRoles();
  }, []);

  const handleRoleChange = async () => {
    if (!selectedRoleId || selectedRoleId === currentRoleId) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("users")
        .update({ role_id: selectedRoleId })
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Role updated",
        description: "User role has been updated successfully.",
      });

      if (onRoleChange) {
        onRoleChange(selectedRoleId);
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Select
        value={selectedRoleId?.toString() || ""}
        onValueChange={(value) => setSelectedRoleId(parseInt(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.id.toString()}>
              {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleRoleChange}
        disabled={isLoading || selectedRoleId === currentRoleId}
        size="sm"
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </div>
  );
}
