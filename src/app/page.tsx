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
              Discover how Tempo Labs AI accelerates development by bootstrapping complete Next.js applications with Supabase integration. Experience the versatility and intelligence that transforms weeks of coding into minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Instant Authentication",
                description:
                  "Built in minutes with Tempo Labs AI, featuring pre-configured Supabase SSR authentication with server-side rendering and multiple sign-in options",
                gradient: "dark:bg-gradient-dark-gray",
              },
              {
                icon: <UserCog className="w-6 h-6" />,
                title: "Database Integration",
                description:
                  "Tempo Labs AI automatically sets up Supabase database connections, models, and queries to get your application data-ready from day one",
                gradient: "dark:bg-gradient-accent",
              },
              {
                icon: <LayoutDashboard className="w-6 h-6" />,
                title: "Complete UI Framework",
                description:
                  "Rapidly developed with Tempo's visual editor, featuring responsive layouts, interactive components, and modern design patterns",
                gradient: "dark:bg-gradient-gray-light",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Security Best Practices",
                description:
                  "Tempo Labs AI implements security best practices including data protection, input validation, and secure API handling",
                gradient: "dark:bg-gradient-highlight",
              },
              {
                icon: <UserPlus className="w-6 h-6" />,
                title: "User Management",
                description:
                  "Complete user management system with profiles, preferences, and media uploads, built in a fraction of the time using Tempo Labs' visual editor",
                gradient: "dark:bg-gradient-dark-gray",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "AI-Powered Development",
                description:
                  "This entire application was built 10x faster with Tempo Labs AI, showcasing the future of rapid application development",
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
              Application Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tempo Labs AI intelligently designs and implements these features, providing a complete application foundation with minimal development time
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
              This demo showcases how Tempo Labs AI accelerates development by combining Next.js and Supabase to create production-ready applications in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white dark:bg-black rounded-xl shadow-sm border border-gray-100 dark:border-zinc-900/50 hover:dark:border-zinc-800 transition-theme dark:bg-gradient-dark-gray dark:subtle-glow">
              <div className="text-4xl font-bold mb-2 text-blue-600 dark:text-white">
                Next.js
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Modern React framework with server components, routing, and optimizations, all configured by Tempo Labs
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-black rounded-xl shadow-sm border border-gray-100 dark:border-zinc-900/50 hover:dark:border-zinc-800 transition-theme dark:bg-gradient-gray-light dark:subtle-glow">
              <div className="text-4xl font-bold mb-2 text-green-600 dark:text-white">
                Supabase
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Open-source backend platform with modern SSR authentication, database, and storage, seamlessly integrated by Tempo Labs AI
              </div>
            </div>
            <div className="static-border rounded-xl premium-shadow">
              <div className="p-6 bg-white dark:bg-black rounded-[0.7rem] transition-theme dark:bg-gradient-highlight dark:subtle-glow h-full flex flex-col">
                <a href="https://www.tempo.new/" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                  <div className="text-4xl font-bold mb-2 text-purple-600 dark:text-white">
                    Tempo Labs
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    AI-powered visual editor that bootstraps complete applications 10x faster
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-black transition-theme relative">
        <div className="absolute inset-0 dark:bg-gradient-accent opacity-0 dark:opacity-100 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative">
          <a href="https://www.tempo.new/" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-90 transition-opacity">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Ready to Experience Tempo Labs?
            </h2>
          </a>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up now to explore this demo and see how Tempo Labs AI can transform your development process, turning complex application ideas into reality in minutes instead of weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="static-border rounded-[0.75rem]">
              <Link
                href="/sign-up"
                className="inline-flex items-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 dark:bg-black dark:hover:bg-zinc-900 rounded-[0.7rem] transition-colors"
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
