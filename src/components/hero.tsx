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
    <div className="relative overflow-hidden bg-black transition-theme min-h-[calc(100vh-73px)] flex flex-col justify-center">
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

      <div className="relative py-5 flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-5">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight relative">
              Tempo Labs{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-gray-300 relative">
                Next.js
                <span className="absolute -inset-1 blur-sm bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-white/20 dark:to-gray-300/20 opacity-0 dark:opacity-70 rounded-lg -z-10"></span>
              </span>{" "}
              Demo
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-5 max-w-2xl mx-auto leading-relaxed">
              Experience the power of Tempo Labs AI for rapid application development. See how our intelligent platform bootstraps sophisticated Next.js applications with Supabase integration in minutes instead of days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5">
              <div className="animated-border group">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center px-6 py-2.5 text-white bg-blue-600 hover:bg-blue-700 dark:bg-black dark:hover:bg-zinc-900 rounded-lg transition-colors text-base md:text-lg font-medium relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 dark:opacity-30"></span>
                  Try It Now
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <Link
                href="/sign-in"
                className="inline-flex items-center px-6 py-2.5 text-gray-700 dark:text-white bg-gray-100 dark:bg-zinc-900/80 hover:dark:bg-zinc-800 rounded-lg hover:bg-gray-200 transition-colors text-base md:text-lg font-medium dark:backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Feature Showcase - 50/50 Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-7xl mx-auto min-h-[500px]">
            {/* Left Side - Feature Description */}
            <div className="w-full flex">
              <div className="p-6 md:p-8 backdrop-blur-sm bg-white/5 dark:bg-zinc-900/30 rounded-2xl border border-gray-100/10 dark:border-white/5 shadow-xl dark:shadow-2xl dark:shadow-blue-900/5 transition-all hover:shadow-blue-500/5 relative overflow-hidden flex-1 flex flex-col justify-between">
                {/* Background decorative elements */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="relative flex-1 flex flex-col">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 dark:text-white relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Accelerated</span> Development
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-base md:text-lg leading-relaxed">
                    Built with Tempo Labs AI, this demo showcases how quickly sophisticated Next.js applications can be developed with Supabase integration, complete UI components, and responsive design.
                  </p>
                  
                  <ul className="space-y-4 mb-6 text-base">
                    <li className="flex items-start dark:text-white group transition-all">
                      <span className="flex-shrink-0 p-1 rounded-full bg-green-100 dark:bg-blue-900/30 mr-3 mt-0.5 group-hover:bg-green-200 dark:group-hover:bg-blue-800/30 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-blue-400" />
                      </span>
                      <span className="opacity-90 group-hover:opacity-100 transition-opacity">Define custom roles with specific permissions</span>
                    </li>
                    <li className="flex items-start dark:text-white group transition-all">
                      <span className="flex-shrink-0 p-1 rounded-full bg-green-100 dark:bg-blue-900/30 mr-3 mt-0.5 group-hover:bg-green-200 dark:group-hover:bg-blue-800/30 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-blue-400" />
                      </span>
                      <span className="opacity-90 group-hover:opacity-100 transition-opacity">Granular control over system access</span>
                    </li>
                    <li className="flex items-start dark:text-white group transition-all">
                      <span className="flex-shrink-0 p-1 rounded-full bg-green-100 dark:bg-blue-900/30 mr-3 mt-0.5 group-hover:bg-green-200 dark:group-hover:bg-blue-800/30 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-blue-400" />
                      </span>
                      <span className="opacity-90 group-hover:opacity-100 transition-opacity">Visual permission management interface</span>
                    </li>
                  </ul>
                  
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-blue-500/5 dark:from-blue-900/20 dark:to-blue-900/10 px-4 py-2 rounded-full backdrop-blur-sm text-sm transition-all hover:shadow-md hover:from-blue-500/15 hover:to-blue-500/10">
                      <UserCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      <span className="text-gray-700 dark:text-gray-300">Three user roles</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-purple-500/5 dark:from-purple-900/20 dark:to-purple-900/10 px-4 py-2 rounded-full backdrop-blur-sm text-sm transition-all hover:shadow-md hover:from-purple-500/15 hover:to-purple-500/10">
                      <ShieldCheck className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                      <span className="text-gray-700 dark:text-gray-300">Secure access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - UI Mockup */}
            <div className="w-full flex">
              <div className="border border-blue-500/20 dark:border-blue-500/10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/5 dark:shadow-blue-500/5 flex-1 flex flex-col">
                <div className="bg-white dark:bg-zinc-900/80 rounded-xl overflow-hidden flex-1 flex flex-col">
                  {/* Role Management UI Mockup */}
                  <div className="rounded-lg overflow-hidden flex-1 flex flex-col h-full">
                    {/* Header */}
                    <div className="bg-white dark:bg-black p-2 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-blue-600 dark:text-white" />
                        <span className="font-semibold dark:text-white text-sm">Role Management</span>
                      </div>
                      <button className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded flex items-center gap-1">
                        <span>Add New Role</span>
                      </button>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-gray-50 dark:bg-zinc-900 flex-1 flex flex-col overflow-auto">
                      {/* System Roles */}
                      <div className="p-2.5 border-b border-gray-200 dark:border-zinc-800 flex-shrink-0">
                        <h3 className="text-xs font-semibold mb-1 dark:text-white">System Roles</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Manage the roles available in the system</p>
                        
                        {/* Roles Table */}
                        <div className="bg-white dark:bg-black rounded overflow-hidden border border-gray-200 dark:border-zinc-800">
                          {/* Table Header */}
                          <div className="grid grid-cols-4 text-xs font-medium text-gray-500 dark:text-gray-400 p-1.5 border-b border-gray-200 dark:border-zinc-800">
                            <div>ID</div>
                            <div>Role</div>
                            <div>Description</div>
                            <div>Actions</div>
                          </div>
                          
                          {/* Admin Role */}
                          <div className="grid grid-cols-4 text-xs p-1.5 border-b border-gray-200 dark:border-zinc-800 items-center">
                            <div className="text-gray-700 dark:text-gray-300">1</div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                              <span className="font-medium dark:text-white">Admin</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">Full system access with user management capabilities</div>
                            <div>
                              <button className="px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs rounded">Edit</button>
                            </div>
                          </div>
                          
                          {/* Editor Role */}
                          <div className="grid grid-cols-4 text-xs p-1.5 border-b border-gray-200 dark:border-zinc-800 items-center">
                            <div className="text-gray-700 dark:text-gray-300">2</div>
                            <div className="flex items-center gap-1">
                              <Edit className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                              <span className="font-medium dark:text-white">Editor</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">Content management with limited analytics access</div>
                            <div>
                              <button className="px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs rounded">Edit</button>
                            </div>
                          </div>
                          
                          {/* User Role */}
                          <div className="grid grid-cols-4 text-xs p-1.5 items-center">
                            <div className="text-gray-700 dark:text-gray-300">3</div>
                            <div className="flex items-center gap-1">
                              <UserCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                              <span className="font-medium dark:text-white">User</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">Basic access to view content and manage own profile</div>
                            <div>
                              <button className="px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs rounded">Edit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Role Permissions */}
                      <div className="p-2.5 flex-1 flex flex-col">
                        <h3 className="text-xs font-semibold mb-1 dark:text-white">Role Permissions</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Configure what each role can access in the system</p>
                        
                        {/* Permissions Table */}
                        <div className="bg-white dark:bg-black rounded overflow-hidden border border-gray-200 dark:border-zinc-800 flex-1">
                          {/* Table Header */}
                          <div className="grid grid-cols-4 text-xs font-medium text-gray-500 dark:text-gray-400 p-1.5 border-b border-gray-200 dark:border-zinc-800">
                            <div>Permission</div>
                            <div>Admin</div>
                            <div>Editor</div>
                            <div>User</div>
                          </div>
                          
                          {/* Access Admin Panel */}
                          <div className="grid grid-cols-4 text-xs p-1.5 border-b border-gray-200 dark:border-zinc-800 items-center">
                            <div className="text-gray-700 dark:text-gray-300 text-xs">Access Admin Panel</div>
                            <div className="text-green-600 dark:text-green-400">✓</div>
                            <div className="text-red-600 dark:text-red-400">✕</div>
                            <div className="text-red-600 dark:text-red-400">✕</div>
                          </div>
                          
                          {/* Manage Users */}
                          <div className="grid grid-cols-4 text-xs p-1.5 border-b border-gray-200 dark:border-zinc-800 items-center">
                            <div className="text-gray-700 dark:text-gray-300 text-xs">Manage Users</div>
                            <div className="text-green-600 dark:text-green-400">✓</div>
                            <div className="text-red-600 dark:text-red-400">✕</div>
                            <div className="text-red-600 dark:text-red-400">✕</div>
                          </div>
                          
                          {/* Edit Content */}
                          <div className="grid grid-cols-4 text-xs p-1.5 border-b border-gray-200 dark:border-zinc-800 items-center">
                            <div className="text-gray-700 dark:text-gray-300 text-xs">Edit Content</div>
                            <div className="text-green-600 dark:text-green-400">✓</div>
                            <div className="text-green-600 dark:text-green-400">✓</div>
                            <div className="text-red-600 dark:text-red-400">✕</div>
                          </div>
                          
                          {/* View Content */}
                          <div className="grid grid-cols-4 text-xs p-1.5 border-b border-gray-200 dark:border-zinc-800 items-center">
                            <div className="text-gray-700 dark:text-gray-300 text-xs">View Content</div>
                            <div className="text-green-600 dark:text-green-400">✓</div>
                            <div className="text-green-600 dark:text-green-400">✓</div>
                            <div className="text-green-600 dark:text-green-400">✓</div>
                          </div>
                          
                          {/* Manage Own Profile */}
                          <div className="grid grid-cols-4 text-xs p-1.5 items-center">
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
    </div>
  );
}
