import { useState } from 'react';
import { Trash2, Edit2, Check, X, Calendar } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');
  const [confirmAction, setConfirmAction] = useState(null);

  const handleSaveRequest = () => {
    if (editTitle.trim() === '') return;
    setConfirmAction('edit');
  };

  const handleConfirm = () => {
    if (confirmAction === 'edit') {
      onUpdate(todo._id, { title: editTitle, description: editDesc });
      setIsEditing(false);
    } else if (confirmAction === 'delete') {
      onDelete(todo._id);
    }
    setConfirmAction(null);
  };

  const handleCancelConfirm = () => {
    setConfirmAction(null);
  };

  if (confirmAction) {
    return (
      <div className={`glass-panel p-4 rounded-xl flex flex-col items-center justify-center gap-3 animate-in fade-in zoom-in duration-200 min-h-[120px] ${confirmAction === 'delete' ? 'border-red-200 bg-red-50/50' : 'border-indigo-200 bg-indigo-50/50'}`}>
        <p className="text-slate-800 font-medium text-center">
          {confirmAction === 'edit' ? 'Are you sure you want to save these changes?' : 'Are you sure you want to delete this task?'}
        </p>
        <div className="flex gap-3 mt-2">
          <button 
            onClick={handleCancelConfirm} 
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm} 
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-md ${
              confirmAction === 'edit' 
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20' 
                : 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="glass-panel p-4 rounded-xl flex flex-col gap-3 animate-in fade-in zoom-in duration-200">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full bg-white text-slate-800 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          autoFocus
        />
        <textarea
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          className="w-full bg-white text-slate-600 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20 text-sm"
          placeholder="Description"
        />
        <div className="flex justify-end gap-2 mt-1">
          <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1">
            <X size={14} /> Cancel
          </button>
          <button onClick={handleSaveRequest} className="px-3 py-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1 shadow-md shadow-indigo-500/20">
            <Check size={14} /> Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group glass-panel p-4 rounded-xl flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${todo.done ? 'hover:shadow-emerald-500/10 border-emerald-100/50 bg-emerald-50/30' : 'hover:shadow-indigo-500/10 border-slate-100'}`}>
      
      <div className="flex items-start justify-between gap-3">
        <h3 className={`font-medium leading-tight ${todo.done ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-800 transition-colors'}`}>
          {todo.title}
        </h3>
        <button
          onClick={() => onToggle(todo._id)}
          className={`shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all shadow-sm ${
            todo.done 
            ? 'bg-emerald-500 border-emerald-600 text-white' 
            : 'bg-white border-slate-300 text-transparent hover:border-indigo-400 hover:text-indigo-400'
          }`}
        >
          <Check size={14} className={todo.done ? 'opacity-100' : 'opacity-0 hover:opacity-100'} strokeWidth={3} />
        </button>
      </div>

      {todo.description && (
        <p className={`text-sm line-clamp-3 ${todo.done ? 'text-slate-400' : 'text-slate-500'}`}>
          {todo.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
          <Calendar size={12} />
          <span>{todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : 'Just now'}</span>
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => setConfirmAction('delete')}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
