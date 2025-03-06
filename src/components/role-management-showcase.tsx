import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Shield, UserCircle, Edit } from "lucide-react";

export default function RoleManagementShowcase() {
  return (
    <section className="py-16 bg-white dark:bg-black border-y border-transparent dark:border-zinc-950 transition-theme relative overflow-hidden">
      <div className="absolute inset-0 dark:bg-gradient-black-gray opacity-0 dark:opacity-100 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">
              Comprehensive Role Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              Our intuitive role management system gives you complete control over user permissions and access levels. Easily configure what each role can access in your system.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start dark:text-white">
                <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-blue-400 mr-3 mt-0.5" />
                <span>Define custom roles with specific permissions</span>
              </li>
              <li className="flex items-start dark:text-white">
                <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-blue-400 mr-3 mt-0.5" />
                <span>Granular control over system access</span>
              </li>
              <li className="flex items-start dark:text-white">
                <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-blue-400 mr-3 mt-0.5" />
                <span>Visual permission management interface</span>
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="inline-flex items-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-lg transition-colors text-base font-medium relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 dark:opacity-30"></span>
              Explore Role Management
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="static-border rounded-xl premium-shadow">
            <div className="bg-white dark:bg-zinc-900/80 p-4 rounded-xl overflow-hidden">
              {/* Role Management UI Mockup */}
              <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
                {/* Header */}
                <div className="bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-white" />
                    <span className="font-semibold dark:text-white">Role Management</span>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md flex items-center gap-1">
                    <span>Add New Role</span>
                  </button>
                </div>
                
                {/* Content */}
                <div className="bg-gray-50 dark:bg-zinc-900">
                  {/* System Roles */}
                  <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
                    <h3 className="text-sm font-semibold mb-2 dark:text-white">System Roles</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Manage the roles available in the system</p>
                    
                    {/* Roles Table */}
                    <div className="bg-white dark:bg-black rounded-md overflow-hidden border border-gray-200 dark:border-zinc-800">
                      {/* Table Header */}
                      <div className="grid grid-cols-4 text-xs font-medium text-gray-500 dark:text-gray-400 p-3 border-b border-gray-200 dark:border-zinc-800">
                        <div>ID</div>
                        <div>Role</div>
                        <div>Description</div>
                        <div>Actions</div>
                      </div>
                      
                      {/* Admin Role */}
                      <div className="grid grid-cols-4 text-sm p-3 border-b border-gray-200 dark:border-zinc-800 items-center">
                        <div className="text-gray-700 dark:text-gray-300">1</div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          <span className="font-medium dark:text-white">Admin</span>
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">Full system access with user management capabilities</div>
                        <div>
                          <button className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs rounded">Edit</button>
                        </div>
                      </div>
                      
                      {/* Editor Role */}
                      <div className="grid grid-cols-4 text-sm p-3 border-b border-gray-200 dark:border-zinc-800 items-center">
                        <div className="text-gray-700 dark:text-gray-300">2</div>
                        <div className="flex items-center gap-2">
                          <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium dark:text-white">Editor</span>
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">Content management with limited analytics access</div>
                        <div>
                          <button className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs rounded">Edit</button>
                        </div>
                      </div>
                      
                      {/* User Role */}
                      <div className="grid grid-cols-4 text-sm p-3 items-center">
                        <div className="text-gray-700 dark:text-gray-300">3</div>
                        <div className="flex items-center gap-2">
                          <UserCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="font-medium dark:text-white">User</span>
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">Basic access to view content and manage own profile</div>
                        <div>
                          <button className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs rounded">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Role Permissions */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2 dark:text-white">Role Permissions</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Configure what each role can access in the system</p>
                    
                    {/* Permissions Table */}
                    <div className="bg-white dark:bg-black rounded-md overflow-hidden border border-gray-200 dark:border-zinc-800">
                      {/* Table Header */}
                      <div className="grid grid-cols-4 text-xs font-medium text-gray-500 dark:text-gray-400 p-3 border-b border-gray-200 dark:border-zinc-800">
                        <div>Permission</div>
                        <div>Admin</div>
                        <div>Editor</div>
                        <div>User</div>
                      </div>
                      
                      {/* Access Admin Panel */}
                      <div className="grid grid-cols-4 text-sm p-3 border-b border-gray-200 dark:border-zinc-800 items-center">
                        <div className="text-gray-700 dark:text-gray-300 text-xs">Access Admin Panel</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                        <div className="text-red-600 dark:text-red-400">✕</div>
                        <div className="text-red-600 dark:text-red-400">✕</div>
                      </div>
                      
                      {/* Manage Users */}
                      <div className="grid grid-cols-4 text-sm p-3 border-b border-gray-200 dark:border-zinc-800 items-center">
                        <div className="text-gray-700 dark:text-gray-300 text-xs">Manage Users</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                        <div className="text-red-600 dark:text-red-400">✕</div>
                        <div className="text-red-600 dark:text-red-400">✕</div>
                      </div>
                      
                      {/* Edit Content */}
                      <div className="grid grid-cols-4 text-sm p-3 border-b border-gray-200 dark:border-zinc-800 items-center">
                        <div className="text-gray-700 dark:text-gray-300 text-xs">Edit Content</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                        <div className="text-red-600 dark:text-red-400">✕</div>
                      </div>
                      
                      {/* View Content */}
                      <div className="grid grid-cols-4 text-sm p-3 border-b border-gray-200 dark:border-zinc-800 items-center">
                        <div className="text-gray-700 dark:text-gray-300 text-xs">View Content</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                      </div>
                      
                      {/* Manage Own Profile */}
                      <div className="grid grid-cols-4 text-sm p-3 items-center">
                        <div className="text-gray-700 dark:text-gray-300 text-xs">Manage Own Profile</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                        <div className="text-green-600 dark:text-green-400">✓</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 