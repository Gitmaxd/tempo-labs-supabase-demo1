import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  UserCircle,
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
          <div className="text-center max-w-4xl mx-auto">
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

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Explore the power of Tempo Labs authentication with role-based
              access control. See how different user roles provide varying
              levels of access and capabilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2 dark:bg-gradient-dark-gray px-4 py-2 rounded-full dark:backdrop-blur-sm">
                <UserCircle className="w-5 h-5 text-blue-500 dark:text-gray-300" />
                <span>Three user roles</span>
              </div>
              <div className="flex items-center gap-2 dark:bg-gradient-gray-light px-4 py-2 rounded-full dark:backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-blue-500 dark:text-gray-300" />
                <span>Secure authentication</span>
              </div>
              <div className="flex items-center gap-2 dark:bg-gradient-accent px-4 py-2 rounded-full dark:backdrop-blur-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-gray-300" />
                <span>Built with Tempo AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
