import React, { useState, useEffect } from 'react';
import { FileText, CheckSquare, MessageSquare, Loader2 } from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';

export default function EmployeeDetailsModal({
  user,
  isOpen,
  onClose,
}) {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'todos'
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentsLoading, setCommentsLoading] = useState({});

  useEffect(() => {
    if (!isOpen || !user) return;

    setLoading(true);
    setError(null);
    setExpandedComments({});

    if (activeTab === 'posts') {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error('პოსტების წამოღება ვერ მოხერხდა');
          return res.json();
        })
        .then((data) => setPosts(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error('დავალებების წამოღება ვერ მოხერხდა');
          return res.json();
        })
        .then((data) => setTodos(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [isOpen, user, activeTab]);

  const toggleComments = async (postId) => {
    if (expandedComments[postId]) {
      // Collapse
      setExpandedComments((prev) => {
        const copy = { ...prev };
        delete copy[postId];
        return copy;
      });
      return;
    }

    setCommentsLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      if (!res.ok) throw new Error('კომენტარები ვერ ჩაიტვირთა');
      const data = await res.json();
      setExpandedComments((prev) => ({ ...prev, [postId]: data.slice(0, 3) }));
    } catch {
      setExpandedComments((prev) => ({ ...prev, [postId]: [] }));
    } finally {
      setCommentsLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const toggleTodo = (todoId) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todoId ? { ...t, completed: !t.completed } : t))
    );
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      badge={
        <Badge variant="cyan" pulse={true}>
          {activeTab === 'posts'
            ? `REST API · GET /posts?userId=${user.id}`
            : `REST API · GET /todos?userId=${user.id}`}
        </Badge>
      }
      title={`${user.name} — მონაცემები`}
      subtitle={`კომპანია: ${user.company?.name || 'N/A'} · ელ-ფოსტა: ${user.email}`}
    >
      <div className="space-y-4">
        {/* Tabs: Posts vs Todos */}
        <div className="flex items-center gap-2 border-b border-slate-700/60 pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`pb-2 px-3 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'posts'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>პოსტები (/posts)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('todos')}
            className={`pb-2 px-3 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'todos'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>დავალებები (/todos)</span>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
            <p className="text-xs text-slate-400">
              მონაცემები იტვირთება JSONPlaceholder-დან...
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm text-center">
            {error}
          </div>
        )}

        {/* Posts Tab Content */}
        {!loading && !error && activeTab === 'posts' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>სულ: {posts.length} პოსტი</span>
              <span className="font-mono">API: JSONPlaceholder /posts</span>
            </div>

            {posts.length === 0 ? (
              <p className="text-center py-8 text-slate-400 text-sm">
                პოსტები ვერ მოიძებნა.
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-2xl bg-navy-800/80 border border-cyan-500/20 space-y-2 hover:border-cyan-400/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                      პოსტი #{post.id}
                    </span>
                    <span className="text-[11px] text-slate-500">2026 წლის არქივი</span>
                  </div>
                  <h4 className="text-sm font-bold text-white capitalize leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {post.body}
                  </p>

                  {/* Comments section */}
                  <div className="pt-2 border-t border-slate-700/40">
                    <button
                      type="button"
                      onClick={() => toggleComments(post.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>
                        {expandedComments[post.id]
                          ? 'კომენტარების დამალვა'
                          : 'კომენტარების ნახვა (/comments)'}
                      </span>
                    </button>

                    {commentsLoading[post.id] && (
                      <p className="text-xs text-slate-400 mt-2 italic">
                        კომენტარები იტვირთება...
                      </p>
                    )}

                    {expandedComments[post.id] && (
                      <div className="mt-2.5 pl-3 border-l-2 border-cyan-500/30 space-y-2 text-xs">
                        {expandedComments[post.id].length === 0 ? (
                          <span className="text-slate-500">კომენტარები არაა</span>
                        ) : (
                          expandedComments[post.id].map((c) => (
                            <div
                              key={c.id}
                              className="p-2.5 rounded-xl bg-navy-900/90 border border-slate-700/50 space-y-1"
                            >
                              <div className="flex items-center justify-between text-[11px] text-cyan-300 font-semibold truncate">
                                <span className="truncate">{c.email}</span>
                                <span className="text-slate-500 shrink-0 font-normal">
                                  #{c.id}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-300 leading-snug">
                                {c.body}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Todos Tab Content */}
        {!loading && !error && activeTab === 'todos' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>
                შესრულებული: {todos.filter((t) => t.completed).length} /{' '}
                {todos.length}
              </span>
              <span className="font-mono">API: JSONPlaceholder /todos</span>
            </div>

            {todos.length === 0 ? (
              <p className="text-center py-8 text-slate-400 text-sm">
                დავალებები ვერ მოიძებნა.
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-navy-800/80 border border-cyan-500/15 hover:border-cyan-400/40 transition-colors text-xs"
                >
                  <label className="flex items-center gap-2.5 min-w-0 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 cursor-pointer accent-cyan-500"
                    />
                    <span
                      className={`truncate ${
                        todo.completed
                          ? 'line-through text-slate-400'
                          : 'text-slate-200 font-medium'
                      }`}
                      title={todo.title}
                    >
                      {todo.title}
                    </span>
                  </label>

                  {todo.completed ? (
                    <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ✓ შესრულებული
                    </span>
                  ) : (
                    <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      ⏳ მიმდინარე
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
