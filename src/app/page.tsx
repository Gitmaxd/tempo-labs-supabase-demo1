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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Supabase Demo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the power of Supabase authentication with our
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
                  "Email/password and OAuth sign-in options with Supabase's secure authentication system",
              },
              {
                icon: <UserCog className="w-6 h-6" />,
                title: "Role-Based Access",
                description:
                  "Three distinct user roles (Admin, Editor, User) with appropriate permissions",
              },
              {
                icon: <LayoutDashboard className="w-6 h-6" />,
                title: "Admin Dashboard",
                description:
                  "Powerful analytics dashboard with user statistics and management capabilities",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Enterprise Security",
                description:
                  "Row-level security and data protection built on Supabase's secure foundation",
              },
              {
                icon: <UserPlus className="w-6 h-6" />,
                title: "Profile Management",
                description:
                  "Complete user profile system with avatar uploads using Supabase Storage",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "AI-Powered Development",
                description:
                  "Built with Tempo Labs AI to showcase rapid application development",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
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
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
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
                color: "bg-purple-100 dark:bg-purple-900",
                textColor: "text-purple-800 dark:text-purple-200",
                borderColor: "border-purple-200 dark:border-purple-700",
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
                color: "bg-blue-100 dark:bg-blue-900",
                textColor: "text-blue-800 dark:text-blue-200",
                borderColor: "border-blue-200 dark:border-blue-700",
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
                color: "bg-green-100 dark:bg-green-900",
                textColor: "text-green-800 dark:text-green-200",
                borderColor: "border-green-200 dark:border-green-700",
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
                className={`p-6 rounded-xl shadow-sm border ${roleInfo.borderColor}`}
              >
                <div
                  className={`${roleInfo.color} rounded-lg p-4 mb-6 text-center`}
                >
                  <h3 className={`text-xl font-bold ${roleInfo.textColor}`}>
                    {roleInfo.role} Role
                  </h3>
                </div>
                <ul className="space-y-3">
                  {roleInfo.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center dark:text-white">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
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
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Built With Modern Technology
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              This demo showcases the power of combining Next.js, Supabase, and
              Tempo Labs AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-4xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                Next.js
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                React framework with server-side rendering
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-4xl font-bold mb-2 text-green-600 dark:text-green-400">
                Supabase
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Open source Firebase alternative
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-4xl font-bold mb-2 text-purple-600 dark:text-purple-400">
                Tempo AI
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                AI-powered development acceleration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Ready to Explore?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up now to experience the power of role-based authentication
            with Supabase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center px-6 py-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
