import { ListTodo, CheckCircle2, CheckSquare } from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView }) {
  return (
    <aside className="w-64 h-full glass-panel border-r border-t-0 border-l-0 border-b-0 hidden md:flex flex-col z-10">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
          <CheckSquare className="text-white" size={20} />
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          MyTask
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <button
          onClick={() => setCurrentView('todo')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium border ${currentView === 'todo'
            ? 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-sm'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-transparent'
            }`}
        >
          <ListTodo size={20} />
          To Do Tasks
        </button>

        <button
          onClick={() => setCurrentView('completed')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium border ${currentView === 'completed'
            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-transparent'
            }`}
        >
          <CheckCircle2 size={20} />
          Completed Tasks
        </button>
      </nav>
    </aside>
  );
}
