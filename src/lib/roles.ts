export type UserRole = "admin" | "editor" | "user";

export interface Role {
  id: number;
  name: UserRole;
  description: string;
}

export const ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  USER: "user",
} as const;

export function getRoleBadgeColor(role: string | null) {
  switch (role) {
    case ROLES.ADMIN:
      return "bg-purple-100 text-purple-800 dark:bg-zinc-900 dark:text-white";
    case ROLES.EDITOR:
      return "bg-blue-100 text-blue-800 dark:bg-zinc-900 dark:text-white";
    case ROLES.USER:
      return "bg-green-100 text-green-800 dark:bg-zinc-900 dark:text-white";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
}

export function getRoleIcon(role: string | null) {
  switch (role) {
    case ROLES.ADMIN:
      return "shield";
    case ROLES.EDITOR:
      return "edit";
    case ROLES.USER:
      return "user";
    default:
      return "user";
  }
}

export function canAccessAdminPanel(role: string | null): boolean {
  return role === ROLES.ADMIN;
}

export function canManageUsers(role: string | null): boolean {
  return role === ROLES.ADMIN;
}

export function canEditContent(role: string | null): boolean {
  return role === ROLES.ADMIN || role === ROLES.EDITOR;
}
