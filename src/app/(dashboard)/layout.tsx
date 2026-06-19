'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  ChevronRight
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    // Redirects to projects with task query or custom tasks tab
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      {/* Mobile Navbar */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800/60">
        <div className="flex items-center">
          <Image src="/ismo.png" alt="ISMO Logo" width={150} height={50} className="h-12 w-auto object-contain" priority />
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar (Responsive) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-350 ease-in-out md:translate-x-0 md:static md:h-screen
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Brand/Logo */}
          <div className="hidden md:flex items-center justify-center px-6 py-6 border-b border-slate-800/60 w-full">
            <Image src="/ismo.png" alt="ISMO Logo" width={180} height={60} className="h-16 w-auto object-contain" priority />
          </div>

          {/* User Info (Mobile Sidebar top) */}
          <div className="md:hidden flex items-center space-x-3 px-6 py-5 border-b border-slate-800 bg-slate-900/60">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">{user?.name}</h4>
              <p className="text-xs text-slate-500 truncate max-w-[150px]">{user?.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              // Check active status
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                    ${isActive
                      ? 'bg-indigo-600/15 text-indigo-400 border-l-4 border-indigo-500 pl-3'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-indigo-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Panel */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40">
          <div className="hidden md:flex items-center space-x-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-indigo-400 border border-slate-700/50 shadow-inner">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <h4 className="font-semibold text-slate-200 text-sm leading-tight">{user?.name}</h4>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 font-medium text-sm transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Desktop Navbar */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-slate-200">
              {pathname === '/dashboard' ? 'Welcome Back!' : pathname.startsWith('/projects') ? 'Project Center' : 'Overview'}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {pathname === '/dashboard' ? `Here's an overview of your current progress.` : 'Manage your workspace effectively.'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-slate-400 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>API Status: Online</span>
            </div>
            <div className="w-px h-6 bg-slate-800"></div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-slate-300">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Content body */}
        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
