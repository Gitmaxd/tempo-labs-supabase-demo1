"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Shield, UserCircle, Menu, X } from "lucide-react";
import Link from "next/link";

export default function MobileMenuButton({ user }: { user: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      
      {/* Simple Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-zinc-900 z-[9999] flex flex-col md:hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900 dark:text-white">Menu</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Menu items */}
          <div className="flex-1 p-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="p-3 text-base font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-800 rounded-md flex items-center gap-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Shield className="h-5 w-5" />
                <span>Home</span>
              </Link>
              
              {user ? (
                <Link
                  href="/dashboard"
                  className="p-3 text-base font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-800 rounded-md flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserCircle className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="p-3 text-base font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-800 rounded-md flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserCircle className="h-5 w-5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/sign-up"
                    className="p-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center justify-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Tempo Labs Demo</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">by GitMaxd</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 