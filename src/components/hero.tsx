import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  UserCircle,
  Edit,
  Shield,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-black transition-theme">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70 dark:from-zinc-900 dark:via-black dark:to-zinc-900 dark:opacity-100"></div>

      {/* Modern vectorized background - direct implementation */}
      <div className="absolute inset-0 z-0 pointer-events-none dark:opacity-25 opacity-0">
        {/* Perspective grid - refined for mathematical correctness */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2.5)',
            transformOrigin: 'center top',
            animation: 'grid-float 20s ease-in-out infinite alternate'
          }}
        ></div>
        
        {/* Horizontal major grid lines */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '300px 300px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2.5)',
            transformOrigin: 'center top',
            animation: 'grid-float 20s ease-in-out infinite alternate'
          }}
        ></div>
        
        {/* Vertical major grid lines */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '300px 300px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2.5)',
            transformOrigin: 'center top',
            animation: 'grid-float 20s ease-in-out infinite alternate'
          }}
        ></div>
        
        {/* Subtle horizon glow */}
        <div 
          className="absolute inset-x-0 top-1/2 h-px z-0" 
          style={{
            background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), rgba(16, 185, 129, 0.3), transparent)',
            boxShadow: '0 0 30px 5px rgba(59, 130, 246, 0.3)',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-50%)',
            transformOrigin: 'center'
          }}
        ></div>
      </div>

      {/* Extended grid to prevent cutoff */}
      <div className="absolute inset-x-0 bottom-0 h-screen z-0 pointer-events-none dark:opacity-15 opacity-0 translate-y-1/2">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2.5)',
            transformOrigin: 'center top',
            animation: 'grid-extend 15s ease-in-out infinite alternate'
          }}
        ></div>
        
        {/* Extended horizontal major grid lines */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '300px 300px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2.5)',
            transformOrigin: 'center top',
            animation: 'grid-extend 15s ease-in-out infinite alternate'
          }}
        ></div>
        
        {/* Extended vertical major grid lines */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '300px 300px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2.5)',
            transformOrigin: 'center top',
            animation: 'grid-extend 15s ease-in-out infinite alternate'
          }}
        ></div>
      </div>
      
      {/* Gradient fade for smooth transition */}
      <div 
        className="absolute inset-x-0 bottom-0 h-96 z-1 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 80%)'
        }}
      ></div>

      {/* Animated gradient orbs - reduced opacity */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-zinc-800/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 dark:bg-zinc-800/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-cyan-400/10 dark:bg-zinc-800/20 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-10 dark:opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight relative">
              Tempo Labs{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-gray-300 relative">
                Authentication
                <span className="absolute -inset-1 blur-sm bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-white/20 dark:to-gray-300/20 opacity-0 dark:opacity-70 rounded-lg -z-10"></span>
              </span>{" "}
              Demo
            </h1>
            <div className="mb-8">
              <span className="text-base text-gray-500 dark:text-gray-400 font-normal tracking-wide px-3 py-1 bg-gray-100 dark:bg-zinc-900 rounded-md inline-block">by GitMaxd</span>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore the power of Tempo Labs authentication with role-based
              access control. See how different user roles provide varying
              levels of access and capabilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <div className="animated-border group">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center px-8 py-4 text-white bg-blue-600 hover:bg-blue-700 dark:bg-black dark:hover:bg-zinc-900 rounded-lg transition-colors text-lg font-medium relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 dark:opacity-30"></span>
                  Try It Now
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <Link
                href="/sign-in"
                className="inline-flex items-center px-8 py-4 text-gray-700 dark:text-white bg-gray-100 dark:bg-zinc-900/80 hover:dark:bg-zinc-800 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium dark:backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Role Management UI Integration */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 lg:pr-8">
              <div className="sticky top-24">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">
                  Comprehensive Role Management
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our intuitive role management system gives you complete control over user permissions and access levels. Easily configure what each role can access in your system.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start dark:text-white">
                    <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Define custom roles with specific permissions</span>
                  </li>
                  <li className="flex items-start dark:text-white">
                    <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Granular control over system access</span>
                  </li>
                  <li className="flex items-start dark:text-white">
                    <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Visual permission management interface</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 mt-8">
                  <div className="flex items-center gap-2 dark:bg-gradient-dark-gray px-4 py-2 rounded-full dark:backdrop-blur-sm">
                    <UserCircle className="w-5 h-5 text-blue-500 dark:text-gray-300" />
                    <span className="text-gray-600 dark:text-gray-400">Three user roles</span>
                  </div>
                  <div className="flex items-center gap-2 dark:bg-gradient-gray-light px-4 py-2 rounded-full dark:backdrop-blur-sm">
                    <ShieldCheck className="w-5 h-5 text-blue-500 dark:text-gray-300" />
                    <span className="text-gray-600 dark:text-gray-400">Secure access</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 static-border rounded-xl premium-shadow">
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
      </div>
    </div>
  );
}
