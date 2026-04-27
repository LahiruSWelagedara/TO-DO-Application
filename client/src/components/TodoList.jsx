import TodoItem from './TodoItem';

export default function TodoList({ todos, currentView, onToggle, onDelete, onUpdate }) {
  const filteredTodos = todos.filter(t => currentView === 'todo' ? !t.done : t.done);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-2 px-2">
        <div className={`w-2 h-2 rounded-full ${currentView === 'todo' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
        <h2 className="text-lg font-semibold text-slate-800">
          {currentView === 'todo' ? 'To Do Tasks' : 'Completed Tasks'}
        </h2>
        <span className="bg-slate-100 text-slate-500 text-xs py-1 px-2 rounded-full ml-auto border border-slate-200">
          {filteredTodos.length}
        </span>
      </div>
      
      {filteredTodos.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-sm">
            {currentView === 'todo' ? 'No pending tasks. You are all caught up!' : 'No completed tasks yet.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredTodos.map(todo => (
            <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}
