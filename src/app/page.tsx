import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  Zap,
  UserCog,
  Lock,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-black transition-theme relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-zinc-800 dark:via-transparent dark:to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full opacity-30 dark:opacity-5 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent dark:from-zinc-800 dark:via-transparent dark:to-transparent"></div>
      </div>
      
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-black border-y border-transparent dark:border-zinc-950 transition-theme relative">
        <div className="absolute inset-0 dark:bg-gradient-black-gray opacity-0 dark:opacity-100 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Tempo Labs Demo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the power of Tempo Labs authentication with our
              comprehensive role management system. Perfect for modern web
              applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Secure Authentication",
                description:
                  "Email/password and OAuth sign-in options with Tempo Labs' secure authentication system",
                gradient: "dark:bg-gradient-dark-gray",
              },
              {
                icon: <UserCog className="w-6 h-6" />,
                title: "Role-Based Access",
                description:
                  "Three distinct user roles (Admin, Editor, User) with appropriate permissions",
                gradient: "dark:bg-gradient-accent",
              },
              {
                icon: <LayoutDashboard className="w-6 h-6" />,
                title: "Admin Dashboard",
                description:
                  "Powerful analytics dashboard with user statistics and management capabilities",
                gradient: "dark:bg-gradient-gray-light",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Enterprise Security",
                description:
                  "Row-level security and data protection built on Tempo Labs' secure foundation",
                gradient: "dark:bg-gradient-highlight",
              },
              {
                icon: <UserPlus className="w-6 h-6" />,
                title: "Profile Management",
                description:
                  "Complete user profile system with avatar uploads using Tempo Labs Storage",
                gradient: "dark:bg-gradient-dark-gray",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "AI-Powered Development",
                description:
                  "Built with Tempo Labs AI to showcase rapid application development",
                gradient: "dark:bg-gradient-accent",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 bg-white dark:bg-black rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-zinc-900/50 hover:dark:border-zinc-800 transition-theme ${feature.gradient} dark:subtle-glow`}
              >
                <div className="text-blue-600 dark:text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Comparison Section */}
      <section className="py-20 bg-gray-50 dark:bg-black border-b border-transparent dark:border-zinc-950 transition-theme relative">
        <div className="absolute inset-0 dark:bg-gradient-dark-gray opacity-0 dark:opacity-100 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Role Comparison
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how different user roles provide varying levels of access and
              capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "Admin",
                color: "bg-purple-100 dark:bg-zinc-900/30",
                textColor: "text-purple-800 dark:text-white",
                borderColor: "border-purple-200 dark:border-zinc-800",
                gradient: "dark:bg-gradient-highlight",
                glow: "dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]",
                features: [
                  "Full system access",
                  "User management",
                  "Analytics dashboard",
                  "Role assignment",
                  "System settings",
                ],
              },
              {
                role: "Editor",
                color: "bg-blue-100 dark:bg-zinc-900/30",
                textColor: "text-blue-800 dark:text-white",
                borderColor: "border-blue-200 dark:border-zinc-800",
                gradient: "dark:bg-gradient-gray-light",
                glow: "dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]",
                features: [
                  "Content management",
                  "Create and edit content",
                  "Limited analytics",
                  "Profile management",
                  "No user management",
                ],
              },
              {
                role: "User",
                color: "bg-green-100 dark:bg-zinc-900/30",
                textColor: "text-green-800 dark:text-white",
                borderColor: "border-green-200 dark:border-zinc-800",
                gradient: "dark:bg-gradient-dark-gray",
                glow: "dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]",
                features: [
                  "View content",
                  "Personal profile",
                  "Change avatar",
                  "Password management",
                  "No admin access",
                ],
              },
            ].map((roleInfo, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-sm border ${roleInfo.borderColor} ${roleInfo.gradient} ${roleInfo.glow} transition-theme`}
              >
                <div
                  className={`${roleInfo.color} rounded-lg p-4 mb-6 text-center backdrop-blur-sm transition-theme dark:glass-effect`}
                >
                  <h3 className={`text-xl font-bold ${roleInfo.textColor}`}>
                    {roleInfo.role} Role
                  </h3>
                </div>
                <ul className="space-y-3">
                  {roleInfo.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center dark:text-white">
                      <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-gray-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white dark:bg-black border-b border-transparent dark:border-zinc-950 transition-theme relative">
        <div className="absolute inset-0 dark:bg-gradient-gray-light opacity-0 dark:opacity-100 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Built With Modern Technology
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              This demo showcases the power of combining Next.js, Tempo Labs, and
              Tempo Labs AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white dark:bg-black rounded-xl shadow-sm border border-gray-100 dark:border-zinc-900/50 hover:dark:border-zinc-800 transition-theme dark:bg-gradient-dark-gray dark:subtle-glow">
              <div className="text-4xl font-bold mb-2 text-blue-600 dark:text-white">
                Next.js
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                React framework with server-side rendering
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-black rounded-xl shadow-sm border border-gray-100 dark:border-zinc-900/50 hover:dark:border-zinc-800 transition-theme dark:bg-gradient-gray-light dark:subtle-glow">
              <div className="text-4xl font-bold mb-2 text-green-600 dark:text-white">
                Tempo Labs
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Advanced authentication and database solution
              </div>
            </div>
            <div className="static-border rounded-xl premium-shadow">
              <div className="p-6 bg-white dark:bg-black rounded-xl transition-theme dark:bg-gradient-highlight dark:subtle-glow">
                <div className="text-4xl font-bold mb-2 text-purple-600 dark:text-white">
                  Tempo AI
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  AI-powered development acceleration
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-black transition-theme relative">
        <div className="absolute inset-0 dark:bg-gradient-accent opacity-0 dark:opacity-100 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Ready to Explore?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up now to experience the power of role-based authentication
            with Supabase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="static-border rounded-lg">
              <Link
                href="/sign-up"
                className="inline-flex items-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 dark:bg-black dark:hover:bg-zinc-900 rounded-lg transition-colors"
              >
                Sign Up
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <Link
              href="/sign-in"
              className="inline-flex items-center px-6 py-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-zinc-900/80 hover:dark:bg-zinc-800 rounded-lg hover:bg-gray-200 transition-colors dark:backdrop-blur-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
