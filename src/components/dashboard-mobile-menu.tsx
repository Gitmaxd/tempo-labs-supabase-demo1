"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Shield,
  UserCircle,
  Menu,
  X,
  LayoutDashboard,
  Settings,
  Edit,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import RoleBadge from "./role-badge";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";

interface DashboardMobileMenuProps {
  userName: string | null;
  userRole: string | null;
}

export default function DashboardMobileMenu({ userName, userRole }: DashboardMobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden h-8 w-8"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      
      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay with blur */}
          <div 
            className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Mobile menu card */}
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-xl transform transition-all duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-white" />
                  <span className="font-medium">Navigation</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Menu items */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/dashboard"
                    className="px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-900/50 rounded-md flex items-center gap-3 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  {userRole === "admin" && (
                    <>
                      <Link
                        href="/dashboard/admin"
                        className="px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-900/50 rounded-md flex items-center gap-3 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Shield className="h-5 w-5" />
                        <span>Admin</span>
                      </Link>
                      <Link
                        href="/dashboard/analytics"
                        className="px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-900/50 rounded-md flex items-center gap-3 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <BarChart3 className="h-5 w-5" />
                        <span>Analytics</span>
                      </Link>
                    </>
                  )}
                  {(userRole === "admin" || userRole === "editor") && (
                    <Link
                      href="/dashboard/content"
                      className="px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-900/50 rounded-md flex items-center gap-3 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Edit className="h-5 w-5" />
                      <span>Content</span>
                    </Link>
                  )}
                  <Link
                    href="#"
                    className="px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-900/50 rounded-md flex items-center gap-3 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <UserCircle className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{userName}</p>
                    {userRole && <RoleBadge role={userRole} size="sm" />}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setMobileMenuOpen(false);
                    router.refresh();
                  }}
                >
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 