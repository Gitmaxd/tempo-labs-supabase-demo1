import Link from "next/link";
import { X, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-zinc-900/50 transition-theme relative">
      <div className="absolute inset-0 dark:bg-gradient-dark-gray opacity-0 dark:opacity-100 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Demo Column */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 relative inline-block">
              Demo
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-600/50 dark:bg-white/50"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Sign In
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Sign Up
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 relative inline-block">
              Resources
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-cyan-600/50 dark:bg-white/50"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://supabase.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Supabase Docs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Next.js Docs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://tempolabs.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Tempo Labs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/supabase/auth-helpers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Auth Helpers
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 relative inline-block">
              Features
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-emerald-600/50 dark:bg-white/50"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Authentication
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Role Management
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  User Profiles
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Admin Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 relative inline-block">
              Legal
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-purple-600/50 dark:bg-white/50"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Privacy
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Terms
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Security
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                >
                  Cookies
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600/30 dark:bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-zinc-900/50 transition-theme">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} Tempo Labs Demo. Built with Tempo Labs AI.
          </div>

          <div className="flex space-x-6">
            <a
              href="https://x.com/gitmaxd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors group"
            >
              <span className="sr-only">X</span>
              <X className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://github.com/Gitmaxd/tempo-labs-supabase-demo1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors group"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
