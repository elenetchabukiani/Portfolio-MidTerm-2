import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  MessageSquare,
  Clock,
  Heart,
  Bookmark,
  Share2,
  Plus,
  Send,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';

const categories = ['ყველა', 'React', 'JavaScript', 'Frontend UI', 'Web APIs'];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ყველა');
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});

  // Active reading modal
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  // Create post modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ title: '', body: '', category: 'React' });
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=18')
      .then((res) => {
        if (!res.ok) throw new Error('სტატიების წამოღება ვერ მოხერხდა');
        return res.json();
      })
      .then((data) => {
        const enriched = data.map((post, i) => ({
          ...post,
          category: categories[(i % (categories.length - 1)) + 1],
          readTime: `${Math.floor(Math.random() * 4) + 2} წთ`,
          views: Math.floor(Math.random() * 500) + 120,
          date: '2026 წლის ნოემბერი',
        }));
        setPosts(enriched);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter posts by search and category
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.body.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'ყველა' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory]);

  // Open Post Reader Modal and fetch comments
  const openPostModal = async (post) => {
    setSelectedPost(post);
    setCommentsLoading(true);
    setComments([]);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
      );
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCommentsLoading(false);
    }
  };

  // Like Toggle
  const toggleLike = (postId, e) => {
    e?.stopPropagation();
    setLikes((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Bookmark Toggle
  const toggleBookmark = (postId, e) => {
    e?.stopPropagation();
    setBookmarks((prev) => {
      const next = !prev[postId];
      showToast(next ? 'სტატია შეინახეთ სანიშნეებში' : 'სტატია ამოიშალა სანიშნეებიდან');
      return { ...prev, [postId]: next };
    });
  };

  // Create Post Submit (POST /posts)
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: createForm.title,
          body: createForm.body,
          userId: 1,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      const data = await res.json();
      const newPostObj = {
        id: data.id || Date.now(),
        title: createForm.title,
        body: createForm.body,
        category: createForm.category,
        readTime: '3 წთ',
        views: 1,
        date: 'ახლახან',
        isNew: true,
      };
      setPosts([newPostObj, ...posts]);
      setIsCreateOpen(false);
      setCreateForm({ title: '', body: '', category: 'React' });
      showToast(`სტატია წარმატებით გამოქვეყნდა! (POST /posts · ID: #${newPostObj.id})`);
    } catch (err) {
      alert('შეცდომა: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Add Comment local
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newComment = {
      id: Date.now(),
      email: 'elene.chabukiani@example.com',
      body: newCommentText.trim(),
    };
    setComments([newComment, ...comments]);
    setNewCommentText('');
    showToast('თქვენი კომენტარი დაემატა!');
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 p-4 rounded-2xl bg-navy-900/95 border border-cyan-500/40 text-cyan-300 text-sm shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-850 via-[#0E172A] to-navy-900 border border-cyan-500/20 p-7 sm:p-10 shadow-card-dark transition-all">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="cyan" pulse={true} icon={<BookOpen className="w-3.5 h-3.5" />}>
              ბლოგი &amp; პუბლიკაციები
            </Badge>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-navy-800 text-slate-300 border border-cyan-500/20 font-mono">
              JSONPlaceholder REST API · /posts &amp; /comments
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                სტატიები, ჩანაწერები და ტექნოლოგიური მიმოხილვები
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                გაეცანით ჩემს პუბლიკაციებს ვებ-დეველოპმენტის, React-ის არქიტექტურის,
                სუფთა კოდისა და თანამედროვე API სტანდარტების შესახებ.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreateOpen(true)}
            >
              სტატიის შექმნა (POST)
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Category Filters */}
      <section className="space-y-4 p-4 sm:p-5 rounded-3xl bg-navy-850/80 border border-cyan-500/20 shadow-card-dark">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="მოძებნეთ სტატია სათაურით ან საკვანძო სიტყვით..."
        />

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-700/50">
          <span className="text-xs font-semibold text-slate-400 mr-1">კატეგორია:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                  : 'bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 border border-cyan-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results Count Banner */}
      {searchQuery && (
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>
            მოიძებნა {filteredPosts.length} სტატია ფრაზით "{searchQuery}"
          </span>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            გასუფთავება
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="animate-pulse bg-navy-850/80 rounded-3xl p-6 border border-cyan-500/15 space-y-4"
            >
              <div className="h-4 bg-navy-800 rounded w-1/3" />
              <div className="h-6 bg-navy-800 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-navy-800 rounded" />
                <div className="h-3 bg-navy-800 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="p-8 text-center rounded-3xl bg-navy-850/80 border border-rose-500/30 text-rose-300">
          <p>{error}</p>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && !error && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              hoverable={true}
              onClick={() => openPostModal(post)}
              className="cursor-pointer"
              badge={
                post.isNew ? (
                  <Badge variant="emerald" pulse={true}>
                    ახალი
                  </Badge>
                ) : (
                  <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/25">
                    {post.category}
                  </span>
                )
              }
              footer={
                <div className="w-full flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => toggleLike(post.id, e)}
                      className={`inline-flex items-center gap-1 transition-colors ${
                        likes[post.id] ? 'text-rose-400 font-bold' : 'hover:text-rose-400'
                      }`}
                      title="მოწონება"
                    >
                      <Heart
                        className={`w-4 h-4 ${likes[post.id] ? 'fill-current' : ''}`}
                      />
                      <span>{likes[post.id] ? 1 : 0}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(post.id, e)}
                      className={`inline-flex items-center gap-1 transition-colors ${
                        bookmarks[post.id]
                          ? 'text-cyan-400 font-bold'
                          : 'hover:text-cyan-400'
                      }`}
                      title="სანიშნეში დამატება"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarks[post.id] ? 'fill-current' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300 font-semibold">
                    წაკითხვა <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              }
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {post.readTime}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    {post.views}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors capitalize leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {post.body}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty Search State */}
      {!loading && !error && filteredPosts.length === 0 && (
        <div className="text-center py-12 px-6 rounded-3xl bg-navy-850/80 border border-cyan-500/15 space-y-3">
          <BookOpen className="w-10 h-10 text-cyan-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">სტატია ვერ მოიძებნა</h3>
          <p className="text-slate-400 text-sm">
            სცადეთ სხვა საძიებო ფრაზა ან აირჩიეთ კატეგორია "ყველა".
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('ყველა');
            }}
          >
            ფილტრების გასუფთავება
          </Button>
        </div>
      )}

      {/* Post Reading Modal (with Comments API) */}
      <Modal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        maxWidth="max-w-2xl"
        badge={
          <Badge variant="cyan" pulse={true}>
            REST API · GET /posts/{selectedPost?.id} &amp; /comments
          </Badge>
        }
        title={selectedPost?.title}
        subtitle={`კატეგორია: ${selectedPost?.category} · წასაკითხი დრო: ${selectedPost?.readTime} · ${selectedPost?.date}`}
      >
        {selectedPost && (
          <div className="space-y-6">
            {/* Article Content */}
            <div className="p-4 sm:p-5 rounded-2xl bg-navy-800/80 border border-cyan-500/20 text-slate-200 text-sm sm:text-base leading-relaxed space-y-3">
              <p>{selectedPost.body}</p>
              <p className="text-slate-400 text-xs sm:text-sm pt-2 border-t border-slate-700/50">
                ეს პოსტი დინამიურად წამოღებულია JSONPlaceholder-ის <code>/posts</code> ენდფოინთიდან.
                კომენტარები იტვირთება რეალურ დროში <code>GET /comments?postId={selectedPost.id}</code> მისამართიდან.
              </p>
            </div>

            {/* Comments Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>დისკუსია &amp; კომენტარები ({comments.length})</span>
                </h4>
                <span className="text-xs text-cyan-400 font-mono">/comments</span>
              </div>

              {/* Add comment form */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="დატოვეთ თქვენი კომენტარი..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
                <Button type="submit" variant="primary" size="sm" icon={<Send className="w-3.5 h-3.5" />}>
                  გაგზავნა
                </Button>
              </form>

              {/* Comments List */}
              {commentsLoading ? (
                <p className="text-xs text-slate-400 text-center py-4 italic">
                  კომენტარები იტვირთება სერვერიდან...
                </p>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-navy-900/90 border border-slate-700/50 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between text-cyan-300 font-semibold">
                        <span className="truncate">{c.email}</span>
                        <span className="text-slate-500 shrink-0 font-normal">#{c.id}</span>
                      </div>
                      <p className="text-slate-300 leading-snug">{c.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Create Post Modal (POST /posts) */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        maxWidth="max-w-lg"
        badge={<Badge variant="emerald">REST API · POST /posts</Badge>}
        title="ახალი სტატიის გამოქვეყნება"
        subtitle="მონაცემები გაიგზავნება JSONPlaceholder სერვერზე (HTTP 201 Created)."
      >
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              სათაური *
            </label>
            <input
              type="text"
              required
              value={createForm.title}
              onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
              placeholder="მაგ: React 18-ის ახალი შესაძლებლობები"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              კატეგორია
            </label>
            <select
              value={createForm.category}
              onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {categories.filter((c) => c !== 'ყველა').map((cat) => (
                <option key={cat} value={cat} className="bg-navy-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              სტატიის შიგთავსი *
            </label>
            <textarea
              rows={4}
              required
              value={createForm.body}
              onChange={(e) => setCreateForm({ ...createForm, body: e.target.value })}
              placeholder="დაწერეთ სტატიის ძირითადი ტექსტი აქ..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 resize-y"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-700/50">
            <Button type="button" variant="secondary" onClick={() => setIsCreateOpen(false)}>
              გაუქმება
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              გამოქვეყნება (POST)
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
