'use client';

import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  X, 
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface Task {
  id: string;
  name: string;
  description: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string | null;
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  startDate: string | null;
  endDate: string | null;
  tasks: Task[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Task Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskStatus, setTaskStatus] = useState<'PENDING' | 'IN_PROGRESS' | 'COMPLETED'>('PENDING');
  const [taskPriority, setTaskPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [taskDue, setTaskDue] = useState('');
  const [taskError, setTaskError] = useState<string | null>(null);
  const [taskLoading, setTaskLoading] = useState(false);

  const fetchProjectDetails = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (err: any) {
      console.error('Error fetching project detail:', err);
      setError(err.response?.data?.message || 'Failed to load project details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handle Quick Status Toggle for Task (e.g. mark complete)
  const toggleTaskCompletion = async (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    
    try {
      await api.put(`/tasks/${task.id}`, { status: newStatus });
      fetchProjectDetails();
    } catch (err: any) {
      console.error('Error toggling task status:', err);
      alert(err.response?.data?.message || 'Failed to update task status');
    }
  };

  // Task Form reset
  const resetTaskForm = () => {
    setTaskName('');
    setTaskDesc('');
    setTaskStatus('PENDING');
    setTaskPriority('MEDIUM');
    setTaskDue('');
    setSelectedTaskId(null);
    setTaskError(null);
  };

  const openCreateTaskModal = () => {
    resetTaskForm();
    setTaskModalMode('create');
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    resetTaskForm();
    setTaskModalMode('edit');
    setSelectedTaskId(task.id);
    setTaskName(task.name);
    setTaskDesc(task.description || '');
    setTaskStatus(task.status);
    setTaskPriority(task.priority);
    setTaskDue(task.dueDate ? task.dueDate.split('T')[0] : '');
    setIsTaskModalOpen(true);
  };

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTaskError(null);
    if (!taskName.trim()) {
      setTaskError('Task name is required');
      return;
    }

    setTaskLoading(true);
    const payload = {
      name: taskName,
      description: taskDesc || null,
      status: taskStatus,
      priority: taskPriority,
      dueDate: taskDue || null,
      projectId: id,
    };

    try {
      if (taskModalMode === 'create') {
        await api.post('/tasks', payload);
      } else if (taskModalMode === 'edit' && selectedTaskId) {
        await api.put(`/tasks/${selectedTaskId}`, payload);
      }
      setIsTaskModalOpen(false);
      resetTaskForm();
      fetchProjectDetails();
    } catch (err: any) {
      console.error('Error submitting task form:', err);
      setTaskError(err.response?.data?.message || 'Failed to submit task details.');
    } finally {
      setTaskLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`);
      fetchProjectDetails();
    } catch (err: any) {
      console.error('Error deleting task:', err);
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  };

  // Filter and Search logic on fetched tasks
  const getFilteredTasks = () => {
    if (!project) return [];
    return project.tasks.filter((task) => {
      const matchesSearch = task.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  };

  const getPriorityStyle = (p: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (p) {
      case 'HIGH': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'MEDIUM': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      default: return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    }
  };

  const getStatusStyle = (s: string) => {
    switch (s) {
      case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'IN_PROGRESS': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-700/40';
    }
  };

  const getStatusText = (s: string) => {
    switch (s) {
      case 'COMPLETED': return 'Completed';
      case 'IN_PROGRESS': return 'In Progress';
      default: return 'Pending';
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="glass-panel max-w-xl mx-auto mt-12 p-8 text-center rounded-3xl border border-slate-800">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-200">Error Loading Project</h3>
        <p className="text-slate-400 mt-2 mb-6">{error || 'Project not found.'}</p>
        <Link 
          href="/projects"
          className="px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl font-semibold text-sm transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const filteredTasks = getFilteredTasks();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Back button and title */}
      <div className="space-y-4">
        <Link 
          href="/projects" 
          className="inline-flex items-center space-x-1 text-slate-400 hover:text-slate-200 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">{project.name}</h2>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${getStatusStyle(project.status)}`}>
                {project.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              {project.description || 'No description provided for this project.'}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-semibold pt-2">
              {project.startDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span>Starts: {new Date(project.startDate).toLocaleDateString()}</span>
                </div>
              )}
              {project.endDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span>Ends: {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={openCreateTaskModal}
            className="flex items-center space-x-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 cursor-pointer shrink-0 w-full md:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Task Filters and Listing */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-slate-200 self-start md:self-center">
            Tasks ({filteredTasks.length})
          </h3>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
              />
            </div>

            {/* Filter Priority */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            {/* Filter Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        {/* Task Cards */}
        {filteredTasks.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 border-dashed max-w-xl mx-auto py-16">
            <CheckSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-200">No Tasks Found</h3>
            <p className="text-slate-400 mt-2 mb-6 max-w-sm mx-auto">
              {search || statusFilter || priorityFilter ? 'No tasks match your filter parameters.' : 'Create tasks to split project goals into manageable items.'}
            </p>
            {!search && !statusFilter && !priorityFilter && (
              <button
                onClick={openCreateTaskModal}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer"
              >
                Create Your First Task
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={(e) => openEditTaskModal(task, e)}
                className={`
                  glass-panel p-4 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer group
                  ${task.status === 'COMPLETED' ? 'opacity-70 bg-slate-900/10' : ''}
                `}
              >
                <div className="flex items-center space-x-3.5 w-full sm:w-auto truncate">
                  {/* Status Toggle Box */}
                  <button
                    onClick={(e) => toggleTaskCompletion(task, e)}
                    className="p-1 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
                  >
                    {task.status === 'COMPLETED' ? (
                      <CheckCircle2 className="w-5.5 h-5.5 text-emerald-500" />
                    ) : (
                      <div className="w-5.5 h-5.5 border-2 border-slate-600 rounded-full hover:border-indigo-500"></div>
                    )}
                  </button>

                  <div className="truncate">
                    <h4 className={`font-semibold text-slate-200 text-sm group-hover:text-indigo-400 transition-colors truncate ${task.status === 'COMPLETED' ? 'line-through text-slate-500 group-hover:text-slate-400' : ''}`}>
                      {task.name}
                    </h4>
                    {task.description && (
                      <p className="text-xs text-slate-400 truncate mt-0.5 max-w-[200px] sm:max-w-md md:max-w-xl">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 ml-9 sm:ml-0 shrink-0 select-none">
                  {/* Priority */}
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${getPriorityStyle(task.priority)}`}>
                    {task.priority}
                  </span>
                  
                  {/* Status */}
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${getStatusStyle(task.status)}`}>
                    {getStatusText(task.status)}
                  </span>

                  {/* Due Date */}
                  {task.dueDate && (
                    <div className="flex items-center space-x-1 text-xs text-slate-500 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-600" />
                      <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}

                  {/* Trash action */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id, e); }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task Creation & Edit Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel border border-slate-800/80 rounded-3xl p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsTaskModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-200 mb-2">
              {taskModalMode === 'create' ? 'Add New Task' : 'Modify Task Details'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Create a task item to track work inside this project scope.
            </p>

            {taskError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start space-x-3 text-rose-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{taskError}</span>
              </div>
            )}

            <form onSubmit={handleTaskSubmit} className="space-y-5">
              {/* Task Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Task Name
                </label>
                <input
                  type="text"
                  required
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="e.g. Design homepage layout"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                />
              </div>

              {/* Task Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  placeholder="Provide sub-tasks, instructions, or deliverables details..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Priority */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-sm transition-all cursor-pointer"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Status
                  </label>
                  <select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-sm transition-all cursor-pointer"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={taskDue}
                  onChange={(e) => setTaskDue(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-sm transition-all cursor-pointer"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800/60 mt-6">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={taskLoading}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center space-x-2"
                >
                  {taskLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>{taskModalMode === 'create' ? 'Create Task' : 'Save Changes'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
