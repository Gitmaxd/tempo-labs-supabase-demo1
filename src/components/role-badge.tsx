import { getRoleBadgeColor } from "@/lib/roles";
import { Shield, Edit, User } from "lucide-react";

interface RoleBadgeProps {
  role: string | null;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function RoleBadge({
  role,
  showIcon = true,
  size = "md",
}: RoleBadgeProps) {
  const colorClass = getRoleBadgeColor(role);

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  };

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const getIcon = () => {
    switch (role) {
      case "admin":
        return <Shield size={iconSize[size]} className="mr-1" />;
      case "editor":
        return <Edit size={iconSize[size]} className="mr-1" />;
      case "user":
        return <User size={iconSize[size]} className="mr-1" />;
      default:
        return <User size={iconSize[size]} className="mr-1" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${colorClass} ${sizeClasses[size]}`}
    >
      {showIcon && getIcon()}
      {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Unknown"}
    </span>
  );
}
