import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [currentView, setCurrentView] = useState('todo'); // 'todo' or 'completed'

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setApiError('Failed to load tasks. Please check your connection or ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newTodoData) => {
    const tempId = Date.now().toString();
    const optimisticTodo = { ...newTodoData, _id: tempId, done: false, createdAt: new Date().toISOString() };
    setTodos([optimisticTodo, ...todos]);
    
    // Automatically switch to 'todo' view if they add a task from 'completed' view
    if (currentView !== 'todo') {
      setCurrentView('todo');
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodoData),
      });
      if (!res.ok) throw new Error('Failed to create todo');
      const savedTodo = await res.json();
      setTodos((prev) => prev.map((t) => (t._id === tempId ? savedTodo : t)));
    } catch (error) {
      console.error('Error creating todo:', error);
      setTodos((prev) => prev.filter((t) => t._id !== tempId));
      setApiError('Failed to save task. Is the backend running?');
      setTimeout(() => setApiError(null), 6000);
    }
  };

  const handleToggle = async (id) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
    );

    try {
      const res = await fetch(`${API_URL}/${id}/done`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to toggle');
    } catch (error) {
      console.error('Error toggling todo:', error);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
      );
      setApiError('Failed to update task status.');
      setTimeout(() => setApiError(null), 5000);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    const previousTodos = [...todos];
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, ...updatedData } : t))
    );

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Failed to update');
    } catch (error) {
      console.error('Error updating todo:', error);
      setTodos(previousTodos);
      setApiError('Failed to update task.');
      setTimeout(() => setApiError(null), 5000);
    }
  };

  const handleDelete = async (id) => {
    const previousTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    } catch (error) {
      console.error('Error deleting todo:', error);
      setTodos(previousTodos);
      setApiError('Failed to delete task.');
      setTimeout(() => setApiError(null), 5000);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-800">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Decorative background blur for light theme */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-300/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10 z-10 custom-scrollbar">
          <header className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">My Tasks</h2>
            <p className="text-slate-500 text-sm">Stay organized and focused</p>
          </header>

          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center justify-between animate-in fade-in slide-in-from-top-2 shadow-sm font-medium">
              <div className="flex items-center gap-2">
                <AlertCircle size={20} className="text-red-500 shrink-0" />
                <p>{apiError}</p>
              </div>
              <button 
                onClick={() => setApiError(null)} 
                className="p-1 hover:bg-red-100 rounded-lg transition-colors text-red-500 shrink-0"
                aria-label="Dismiss error"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <div className="max-w-3xl">
            {/* Only show form if in Todo view, or show it always but it adds to Todo? Always showing is fine. */}
            {currentView === 'todo' && <TodoForm onAdd={handleAdd} />}

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <TodoList
                todos={todos}
                currentView={currentView}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
