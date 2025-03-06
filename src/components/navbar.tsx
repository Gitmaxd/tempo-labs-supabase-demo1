import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { Shield, UserCircle } from "lucide-react";
import UserProfile from "./user-profile";
import { ThemeSwitcher } from "./theme-switcher";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 dark:border-zinc-900/50 bg-white/80 dark:bg-black/80 py-3 sticky top-0 z-10 backdrop-blur-sm dark:backdrop-blur-md transition-theme dark:glass-effect">
      <div className="absolute inset-0 dark:bg-gradient-black-gray opacity-0 dark:opacity-30 pointer-events-none"></div>
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        <Link
          href="/"
          prefetch
          className="text-xl font-bold flex items-center gap-2 dark:text-white group"
        >
          <Shield className="h-6 w-6 text-blue-600 dark:text-white group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span>Tempo Labs Demo</span>
          </div>
        </Link>
        <div className="ml-8 -mt-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-normal tracking-wide px-2 py-0.5 bg-gray-100 dark:bg-zinc-900 rounded-md inline-block">by GitMaxd</span>
        </div>
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white transition-colors dark:subtle-glow relative overflow-hidden group">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 dark:opacity-30"></span>
                  Dashboard
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
              >
                Sign In
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-zinc-900 rounded-md hover:bg-blue-700 dark:hover:bg-zinc-800 transition-colors relative overflow-hidden group inline-block shadow-[0_0_0_1px_rgba(59,130,246,0.5)] hover:shadow-[0_0_0_2px_rgba(59,130,246,0.8)]"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 dark:opacity-30"></span>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
