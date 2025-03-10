"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  Shield,
  Settings,
  LayoutDashboard,
  Users,
  Edit,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";
import { useEffect, useState } from "react";
import RoleBadge from "./role-badge";
import DashboardMobileMenu from "./dashboard-mobile-menu";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function getUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("users")
          .select("*, roles(name)")
          .eq("id", user.id)
          .single();

        if (data) {
          setUserRole(data.roles?.name || null);
          setUserName(data.full_name || data.name || user.email);
        }
      }
    }

    getUserData();
  }, []);

  return (
    <nav className="w-full border-b border-gray-200 dark:border-zinc-900 bg-white dark:bg-black py-2 sm:py-4 sticky top-0 z-10">
      <div className="container mx-auto px-3 sm:px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            prefetch
            className="text-lg sm:text-xl font-bold flex items-center gap-1.5 sm:gap-2 dark:text-white"
          >
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-white" />
            <div className="flex flex-col">
              <span>Tempo Labs Demo</span>
            </div>
          </Link>
          <div className="ml-2 sm:ml-8 -mt-1 hidden sm:block">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal tracking-wide px-1.5 sm:px-2 py-0.5 bg-gray-100 dark:bg-zinc-900 rounded-md inline-block">by GitMaxd</span>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/dashboard"
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-md flex items-center gap-1"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            {userRole === "admin" && (
              <>
                <Link
                  href="/dashboard/admin"
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-md flex items-center gap-1"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-md flex items-center gap-1"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </>
            )}
            {(userRole === "admin" || userRole === "editor") && (
              <Link
                href="/dashboard/content"
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-md flex items-center gap-1"
              >
                <Edit className="h-4 w-4" />
                <span>Content</span>
              </Link>
            )}
            <Link
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-md flex items-center gap-1"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          <ThemeSwitcher />
          <Link href="/" className="md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <DashboardMobileMenu userName={userName} userRole={userRole} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{userName}</p>
                {userRole && (
                  <div className="mt-1">
                    <RoleBadge role={userRole} size="sm" />
                  </div>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="cursor-pointer w-full">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              {userRole === "admin" && (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/admin"
                      className="cursor-pointer w-full"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/analytics"
                      className="cursor-pointer w-full"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Analytics Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="cursor-pointer w-full"
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
                className="cursor-pointer"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
