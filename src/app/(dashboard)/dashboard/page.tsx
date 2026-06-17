'use client';

import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import Link from 'next/link';
import { 
  Briefcase, 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  Plus, 
  TrendingUp, 
  Calendar,
  ChevronRight,
  Loader2
} from 'lucide-react';

interface DashboardData {
  stats: {
    totalProjects: number;
    projectsInProgress: number;
    projectsCompleted: number;
    totalTasks: number;
    tasksPending: number;
    tasksInProgress: number;
    tasksCompleted: number;
  };
  recentProjects: Array<{
    id: string;
    name: string;
    description: string | null;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    createdAt: string;
    _count: {
      tasks: number;
    };
  }>;
  tasksDueSoon: Array<{
    id: string;
    name: string;
    description: string | null;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    dueDate: string;
    project: {
      name: string;
    };
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setData(response.data);
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard metrics. Please check connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-slate-400 font-medium text-sm">Assembling dashboard analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass-panel max-w-xl mx-auto mt-12 p-8 rounded-3xl text-center border border-slate-800">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-200">System Connection Issue</h3>
        <p className="text-slate-400 mt-2 mb-6">{error || 'Unable to retrieve metrics'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const { stats, recentProjects, tasksDueSoon } = data;

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      desc: 'All projects created',
      icon: Briefcase,
      color: 'from-blue-600/10 to-indigo-600/10 border-blue-500/20',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      valueColor: 'text-blue-300',
    },
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      desc: 'Across all projects',
      icon: CheckSquare,
      color: 'from-violet-600/10 to-purple-600/10 border-violet-500/20',
      iconBg: 'bg-violet-500/10',
      iconColor: 'text-violet-400',
      valueColor: 'text-violet-300',
    },
    {
      title: 'Completed Tasks',
      value: stats.tasksCompleted,
      desc: stats.totalTasks > 0 ? `${Math.round((stats.tasksCompleted / stats.totalTasks) * 100)}% completion rate` : 'No tasks yet',
      icon: TrendingUp,
      color: 'from-emerald-600/10 to-teal-600/10 border-emerald-500/20',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
      valueColor: 'text-emerald-300',
    },
    {
      title: 'Pending Tasks',
      value: stats.tasksPending + stats.tasksInProgress,
      desc: `${stats.tasksPending} pending · ${stats.tasksInProgress} in progress`,
      icon: Clock,
      color: 'from-amber-600/10 to-orange-600/10 border-amber-500/20',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      valueColor: 'text-amber-300',
    },
    {
      title: 'Projects in Progress',
      value: stats.projectsInProgress,
      desc: `${stats.projectsCompleted} completed · ${stats.totalProjects - stats.projectsInProgress - stats.projectsCompleted} not started`,
      icon: TrendingUp,
      color: 'from-rose-600/10 to-pink-600/10 border-rose-500/20',
      iconBg: 'bg-rose-500/10',
      iconColor: 'text-rose-400',
      valueColor: 'text-rose-300',
    },
  ];

  const getPriorityColor = (p: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (p) {
      case 'HIGH': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'MEDIUM': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'LOW': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-medium';
      case 'IN_PROGRESS': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs px-2.5 py-1 rounded-full font-medium';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-700/30 text-xs px-2.5 py-1 rounded-full font-medium';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100">Overview Dashboard</h2>
          <p className="text-sm text-slate-400">Track and monitor your workspaces and active tasks.</p>
        </div>
        <Link 
          href="/projects" 
          className="flex items-center space-x-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Metrics Grid — 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`relative glass-panel p-5 rounded-2xl border bg-gradient-to-br ${card.color} transition-all duration-200 hover:translate-y-[-3px] hover:shadow-lg overflow-hidden group`}
            >
              {/* Subtle background glow blob */}
              <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 ${card.iconBg}`} />

              <div className="flex justify-between items-start mb-4">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-tight">{card.title}</span>
                <div className={`p-2 rounded-xl ${card.iconBg} ${card.iconColor} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className={`text-4xl font-black tracking-tight tabular-nums ${card.valueColor}`}>
                  {card.value}
                </span>
                <p className="text-[11px] text-slate-500 mt-2 font-semibold leading-snug">{card.desc}</p>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${card.iconBg} opacity-60 rounded-b-2xl`} />
            </div>
          );
        })}
      </div>

      {/* Main Sections (Dual Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Projects & Task Priority */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Projects Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-100">Recent Projects</h3>
                <p className="text-xs text-slate-400">Your most recently created workspaces.</p>
              </div>
              <Link href="/projects" className="text-indigo-400 hover:text-indigo-300 font-semibold text-xs transition-colors flex items-center space-x-0.5">
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                <Briefcase className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No projects created yet.</p>
                <Link href="/projects" className="text-indigo-400 hover:text-indigo-300 font-semibold text-xs mt-1 inline-block">
                  Create your first project
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/60">
                {recentProjects.map((project) => (
                  <Link 
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex justify-between items-center py-4 first:pt-0 last:pb-0 hover:bg-slate-800/10 px-2 -mx-2 rounded-xl transition-all group"
                  >
                    <div className="truncate pr-4">
                      <h4 className="font-semibold text-slate-200 text-sm group-hover:text-indigo-400 transition-colors truncate">
                        {project.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate mt-1 max-w-xs md:max-w-md">
                        {project.description || 'No description provided.'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0">
                      <span className={getStatusBadge(project.status)}>{project.status.replace('_', ' ')}</span>
                      <span className="text-[11px] text-slate-400 font-medium px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">
                        {project._count.tasks} {project._count.tasks === 1 ? 'task' : 'tasks'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>


        </div>

        {/* Right Column: Tasks Due Soon */}
        <div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 h-full flex flex-col">
            <div className="mb-6">
              <h3 className="font-bold text-lg text-slate-100">Tasks Due Soon</h3>
              <p className="text-xs text-slate-400">Critical deadlines coming up next.</p>
            </div>

            {tasksDueSoon.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-10 border border-dashed border-slate-800 rounded-xl bg-slate-900/20 text-center">
                <CheckSquare className="w-8 h-8 text-slate-600 mb-2" />
                <p className="text-sm text-slate-400">No pending task deadlines.</p>
                <p className="text-xs text-slate-500 mt-1">Excellent job keeping up!</p>
              </div>
            ) : (
              <div className="flex-1 space-y-4">
                {tasksDueSoon.map((task) => {
                  const date = new Date(task.dueDate);
                  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  
                  return (
                    <div 
                      key={task.id}
                      className="p-4 bg-slate-900/40 border border-slate-800/70 hover:border-slate-700 rounded-xl transition-all space-y-2.5"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-semibold text-sm text-slate-200 line-clamp-1">{task.name}</span>
                        <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-800/60 pt-2">
                        <span className="text-slate-500 truncate max-w-[120px]">{task.project.name}</span>
                        <div className="flex items-center space-x-1 shrink-0 text-slate-400 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{formattedDate}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
