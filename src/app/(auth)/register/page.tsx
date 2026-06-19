'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail, Lock, User as UserIcon, AlertCircle, ArrowRight,
  Eye, EyeOff, CheckCircle2, BarChart3, Users, Zap, Shield,
  LogIn, UserPlus,
} from 'lucide-react';

const features = [
  { icon: Zap, title: 'Zero Latency', desc: 'Real-time sync across all project nodes.' },
  { icon: Shield, title: 'Top-tier Security', desc: 'Enterprise-grade role-based access control.' },
  { icon: BarChart3, title: 'Live Analytics', desc: 'Dashboards and insightful metrics on demand.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Assign tasks and keep stakeholders aligned.' },
];

export default function RegisterPage() {
  const { register, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router]);

  const validate = () => {
    const errors: { name?: string; email?: string; password?: string } = {};
    if (!name) errors.name = 'Full name is required';
    else if (name.length < 2) errors.name = 'Name must be at least 2 characters';
    if (!email) errors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Please enter a valid email address';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    try {
      await register(name, email, password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(msg);
    }
  };

  const strengthLevel =
    password.length === 0 ? 0 : password.length >= 10 ? 3 : password.length >= 6 ? 2 : 1;
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];
  const strengthColors = ['', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500'];

  const formBody = (compact = false, idPrefix = 'default') => (
    <>
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" id={`${idPrefix}-register-form`}>
        {/* Full Name */}
        <div>
          <label htmlFor={`${idPrefix}-register-name`} className={`block text-xs font-semibold mb-2 ${compact ? 'text-slate-400 uppercase tracking-wider' : 'text-slate-300'}`}>
            Full Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
              <UserIcon className="w-5 h-5" />
            </span>
            <input
              id={`${idPrefix}-register-name`}
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              suppressHydrationWarning
              className={`w-full pl-11 pr-4 py-3.5 border rounded-xl text-slate-200 placeholder-slate-600
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm
                ${compact ? 'bg-slate-900/70' : 'bg-[#0d1020]/80'}
                ${formErrors.name ? 'border-rose-500/60' : 'border-slate-700/60 focus:border-indigo-500'}`}
            />
          </div>
          {formErrors.name && <p className="mt-1.5 text-xs text-rose-400">{formErrors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${idPrefix}-register-email`} className={`block text-xs font-semibold mb-2 ${compact ? 'text-slate-400 uppercase tracking-wider' : 'text-slate-300'}`}>
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
              <Mail className="w-5 h-5" />
            </span>
            <input
              id={`${idPrefix}-register-email`}
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              suppressHydrationWarning
              className={`w-full pl-11 pr-4 py-3.5 border rounded-xl text-slate-200 placeholder-slate-600
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm
                ${compact ? 'bg-slate-900/70' : 'bg-[#0d1020]/80'}
                ${formErrors.email ? 'border-rose-500/60' : 'border-slate-700/60 focus:border-indigo-500'}`}
            />
          </div>
          {formErrors.email && <p className="mt-1.5 text-xs text-rose-400">{formErrors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor={`${idPrefix}-register-password`} className={`block text-xs font-semibold mb-2 ${compact ? 'text-slate-400 uppercase tracking-wider' : 'text-slate-300'}`}>
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
              <Lock className="w-5 h-5" />
            </span>
            <input
              id={`${idPrefix}-register-password`}
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              suppressHydrationWarning
              className={`w-full pl-11 pr-12 py-3.5 border rounded-xl text-slate-200 placeholder-slate-600
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm
                ${compact ? 'bg-slate-900/70' : 'bg-[#0d1020]/80'}
                ${formErrors.password ? 'border-rose-500/60' : 'border-slate-700/60 focus:border-indigo-500'}`}
            />
            <button
              type="button"
              id={`${idPrefix}-toggle-register-password-visibility`}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-indigo-400 active:text-indigo-300 transition-colors touch-manipulation"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formErrors.password && <p className="mt-1.5 text-xs text-rose-400">{formErrors.password}</p>}

          {/* Password strength bar */}
          {password.length > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strengthLevel ? strengthColors[strengthLevel] : 'bg-slate-700'
                    }`}
                />
              ))}
              <span className={`text-xs font-medium ml-1 transition-colors ${strengthLevel === 3 ? 'text-emerald-400' :
                strengthLevel === 2 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                {strengthLabels[strengthLevel]}
              </span>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          id={`${idPrefix}-register-submit-btn`}
          type="submit"
          disabled={loading}
          className="w-full py-4 px-4 mt-1 rounded-xl font-bold text-base transition-all duration-200
            flex items-center justify-center gap-2
            bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-600
            hover:from-violet-400 hover:via-indigo-400 hover:to-violet-500
            active:scale-[0.98] text-white
            shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group touch-manipulation"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950">

      {/* ══════════════════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on lg+)
      ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #080c1a 0%, #0b0f1f 60%, #0d0e1e 100%)' }}>

        {/* Ambient blobs */}
        <div className="fixed top-0 right-1/4 w-72 h-72 bg-violet-700/15 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-1/3 left-0 w-64 h-64 bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />

        {/* Scrollable area */}
        <main className="flex-1 overflow-y-auto pb-20 relative z-10">

          {/* ── Brand ── */}
          <div className="flex justify-center pt-10 pb-2">
            <div className="flex items-center">
              <Image src="/ismo.png" alt="ISMO Logo" width={550} height={550} className="h-[250px] w-auto object-contain rounded-xl shadow-lg shadow-indigo-600/40" priority />
            </div>
          </div>

          {/* ── Hero heading ── */}
          <div className="px-6 pt-8 pb-6 text-center">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.1] tracking-tight mb-3">
              <span className="bg-gradient-to-br from-violet-300 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                Be Smarter,<br />Build Faster.
              </span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              Create an account to unlock your personalized project dashboard and start shipping faster.
            </p>
          </div>

          {/* ── Glass form card ── */}
          <div className="mx-4 rounded-2xl border border-white/[0.07] p-6 shadow-2xl"
            style={{ background: 'rgba(17,22,38,0.85)', backdropFilter: 'blur(24px)' }}>
            {formBody(false, 'mobile')}

            <p className="text-center text-slate-500 text-sm mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                Sign In
              </Link>
            </p>
          </div>

          {/* ── Feature cards ── */}
          <div className="mx-4 mt-4 space-y-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="flex items-center gap-4 rounded-2xl border border-white/[0.06] p-4"
                style={{ background: 'rgba(17,22,38,0.6)' }}>
                <div className="p-2.5 rounded-xl bg-violet-600/10 border border-violet-500/20 shrink-0">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-violet-300 font-mono tracking-wide">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badge */}
          <div className="flex justify-center items-center gap-2 mt-6 mb-2 text-slate-600 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Free to join · No credit card required</span>
          </div>
        </main>


      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below lg)
      ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex min-h-screen bg-slate-950 overflow-x-hidden">

        {/* Left panel */}
        <div className="lg:w-1/2 relative flex flex-col justify-between p-12 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-20 w-[400px] h-[400px] bg-violet-700/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(#a5b4fc 1px,transparent 1px),linear-gradient(90deg,#a5b4fc 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative z-10 flex items-center">
            <Image src="/ismo.png" alt="ISMO Logo" width={150} height={50} className="h-24 w-auto object-contain rounded-xl shadow-lg shadow-indigo-600/30" priority />
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center py-16">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs font-semibold text-violet-300 tracking-wide uppercase">Join the Platform</span>
            </div>
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight text-white mb-4">
              Start Managing<br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Projects Smarter</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm mb-10">
              Create a free account and join hundreds of teams who ship projects on time with ISMO.
            </p>
            <div className="grid grid-cols-1 gap-4 max-w-sm">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 group-hover:border-violet-500/40 group-hover:bg-violet-500/10 transition-all duration-200 shrink-0">
                    <Icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-slate-500 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Free to join · No credit card required</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />

        {/* Right form panel */}
        <div className="flex-1 flex flex-col min-h-screen relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-violet-700/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex-1 flex items-center justify-center px-8 relative z-10">
            <div className="w-full max-w-md">
              <div className="mb-7">
                <h1 className="text-3xl font-extrabold text-white mb-1.5">Create an account</h1>
                <p className="text-slate-400 text-sm">Fill in the details below to get started.</p>
              </div>

              {formBody(true, 'desktop')}

              <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
                <p className="text-slate-400 text-sm">
                  Already have an account?{' '}
                  <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline decoration-indigo-400/30 underline-offset-4">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
