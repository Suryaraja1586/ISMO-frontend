'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
<<<<<<< HEAD
import { Mail, Lock, AlertCircle, ArrowRight, Briefcase, CheckCircle2 } from 'lucide-react';
=======
import {
  Mail, Lock, AlertCircle, ArrowRight, Briefcase,
  Eye, EyeOff, CheckCircle2, BarChart3, Users, Zap, Shield,
} from 'lucide-react';

const features = [
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Live dashboards and insightful metrics.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Assign tasks and keep stakeholders aligned.' },
  { icon: Zap, title: 'Fast & Responsive', desc: 'Built for productivity at every screen size.' },
  { icon: Shield, title: 'Secure by Default', desc: 'Enterprise-grade auth and role-based access.' },
];

/** Mini feature pill shown on mobile below the brand */
function MobileFeatureChip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-800/70 border border-slate-700/60 rounded-full px-3 py-1.5 whitespace-nowrap">
      <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
      <span className="text-xs font-medium text-slate-300">{label}</span>
    </div>
  );
}
>>>>>>> 44e0aba568d4b6054d0df946ba31325fbdeb8407

export default function LoginPage() {
  const { login, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router]);

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Please enter a valid email address';
    if (!password) errors.password = 'Password is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-950">
      
      {/* Info Side - Hidden on Mobile */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-slate-900 to-indigo-950/40 relative overflow-hidden border-r border-slate-800/60">
        {/* Decorative Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="flex items-center space-x-4 mb-12">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              ISMO PMS
            </h1>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-slate-100 to-indigo-200 bg-clip-text text-transparent leading-tight">
            Elevate Your <br />Project Workflow
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Experience the next generation of project management. Streamline tasks, collaborate seamlessly, and deliver exceptional results faster.
          </p>
          
          <div className="space-y-5">
            <div className="flex items-center space-x-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
              <CheckCircle2 className="w-6 h-6 text-indigo-400 flex-shrink-0" />
              <span className="text-slate-200 font-medium">Real-time collaboration and dynamic updates</span>
            </div>
            <div className="flex items-center space-x-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
              <CheckCircle2 className="w-6 h-6 text-indigo-400 flex-shrink-0" />
              <span className="text-slate-200 font-medium">Advanced analytics and comprehensive reporting</span>
            </div>
            <div className="flex items-center space-x-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
              <CheckCircle2 className="w-6 h-6 text-indigo-400 flex-shrink-0" />
              <span className="text-slate-200 font-medium">Secure, role-based access control</span>
            </div>
          </div>
=======
    <div className="min-h-screen flex bg-slate-950 overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          LEFT PANEL — desktop only (≥ lg)
      ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-[400px] h-[400px] bg-violet-700/20 rounded-full blur-3xl pointer-events-none" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#a5b4fc 1px,transparent 1px),linear-gradient(90deg,#a5b4fc 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/30">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">ISMO PM System</span>
>>>>>>> 44e0aba568d4b6054d0df946ba31325fbdeb8407
        </div>
      </div>

<<<<<<< HEAD
      {/* Form Side */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Mobile-only background decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-indigo-600/10 rounded-full blur-3xl lg:hidden"></div>
        
        <div className="w-full max-w-md z-10">
          
          {/* Mobile Brand (visible only on mobile) */}
          <div className="flex flex-col items-center mb-10 text-center lg:hidden">
            <div className="bg-indigo-600 p-3.5 rounded-2xl shadow-xl shadow-indigo-600/20 mb-4 inline-flex">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              ISMO PMS
            </h1>
            <p className="text-slate-400 mt-2 text-sm max-w-xs">
              Sign in to manage your workspace
            </p>
=======
        {/* Hero */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-16">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase">Project Management</span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight text-white mb-4">
            Build, Track &amp;<br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Deliver Faster</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm mb-10">
            ISMO gives your team the clarity and tools to ship projects on time — every time.
          </p>
          <div className="grid grid-cols-1 gap-4 max-w-sm">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 group">
                <div className="mt-0.5 p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-all duration-200 shrink-0">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust */}
        <div className="relative z-10 flex items-center gap-2 text-slate-500 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Trusted by 200+ teams worldwide</span>
        </div>
      </div>

      {/* Vertical divider — desktop only */}
      <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />

      {/* ════════════════════════════════════════════════════════
          RIGHT PANEL — form (full width on mobile, half on desktop)
      ════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen relative">

        {/* Subtle background blobs — visible on mobile too */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-700/10 rounded-full blur-3xl pointer-events-none" />

        {/* ── FORM AREA ── */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-10 lg:py-0 relative z-10">
          <div className="w-full max-w-md">

            {/* Mobile Brand Header - visible only on mobile/tablet (< lg) */}
            <div className="lg:hidden flex flex-col mb-8">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/30">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">ISMO PM System</span>
              </div>
              <p className="text-slate-400 text-sm pl-0.5">
                Manage projects and track tasks in real-time.
              </p>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1.5">Welcome back</h1>
              <p className="text-slate-400 text-sm">Sign in to your account to continue.</p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" id="login-form">

              {/* Email */}
              <div>
                <label htmlFor="login-email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-900/70 border rounded-xl text-slate-200 placeholder-slate-600
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-base sm:text-sm
                      ${formErrors.email ? 'border-rose-500/60' : 'border-slate-700/80 focus:border-indigo-500'}`}
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1.5 text-xs text-rose-400">{formErrors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="login-password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-12 py-3.5 bg-slate-900/70 border rounded-xl text-slate-200 placeholder-slate-600
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-base sm:text-sm
                      ${formErrors.password ? 'border-rose-500/60' : 'border-slate-700/80 focus:border-indigo-500'}`}
                  />
                  <button
                    type="button"
                    id="toggle-password-visibility"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-indigo-400 active:text-indigo-300 transition-colors touch-manipulation"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="mt-1.5 text-xs text-rose-400">{formErrors.password}</p>
                )}
              </div>

              {/* Submit */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-4 sm:py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white rounded-xl
                  font-semibold text-base sm:text-sm transition-all duration-200
                  flex items-center justify-center gap-2 mt-2
                  shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40
                  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group touch-manipulation"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Footer link */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
              <p className="text-slate-400 text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline decoration-indigo-400/30 underline-offset-4"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Mobile trust badge */}
            <div className="lg:hidden mt-6 flex items-center justify-center gap-2 text-slate-600 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Trusted by 200+ teams worldwide</span>
            </div>
>>>>>>> 44e0aba568d4b6054d0df946ba31325fbdeb8407
          </div>

          <div className="mb-8 hidden lg:block">
            <h2 className="text-3xl font-bold text-slate-100">Welcome back</h2>
            <p className="text-slate-400 mt-2">Please enter your details to sign in.</p>
          </div>

          <div className="glass-panel rounded-3xl p-8 shadow-2xl relative border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start space-x-3 text-rose-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm
                      ${formErrors.email ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'}
                    `}
                    placeholder="name@example.com"
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center space-x-1">
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm
                      ${formErrors.password ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'}
                    `}
                    placeholder="••••••••"
                  />
                </div>
                {formErrors.password && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center space-x-1">
                    <span>{formErrors.password}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline decoration-indigo-400/30 underline-offset-4"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

