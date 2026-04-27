import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    if (!trimmedTitle) {
      setError('Task title is required');
      return;
    }
    if (trimmedTitle.length > 60) {
      setError('Task title cannot exceed 60 characters');
      return;
    }
    if (trimmedDesc.length > 200) {
      setError('Description cannot exceed 200 characters');
      return;
    }
    
    setError('');
    onAdd({ title: trimmedTitle, description: trimmedDesc });
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`glass-panel rounded-2xl p-2 mb-8 transition-all duration-300 relative group focus-within:ring-2 ${error ? 'ring-2 ring-red-500/50 focus-within:ring-red-500/50' : 'focus-within:ring-indigo-500/50'} bg-white/80`}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          maxLength={61}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          onFocus={() => setIsExpanded(true)}
          className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 px-2 py-3 focus:outline-none text-lg font-medium"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-colors shrink-0"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-32 opacity-100 mt-2 px-2 pb-2' : 'max-h-0 opacity-0'}`}>
        <textarea
          placeholder="Add a description (optional)"
          value={description}
          maxLength={201}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError('');
          }}
          className={`w-full bg-slate-50 text-slate-700 placeholder-slate-400 border ${error && description.trim().length > 200 ? 'border-red-300 focus:ring-red-500/50' : 'border-slate-200 focus:ring-indigo-500/50'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 resize-none h-16 text-sm`}
        />
        {error && (
          <div className="absolute -bottom-6 left-2 text-red-500 text-xs font-medium flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded border border-red-100 shadow-sm animate-in fade-in slide-in-from-top-1 z-10">
            <span className="w-1 h-1 rounded-full bg-red-500"></span>
            {error}
          </div>
        )}
      </div>
    </form>
  );
}
