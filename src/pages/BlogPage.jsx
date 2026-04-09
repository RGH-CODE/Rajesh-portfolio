import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiLoader, FiX, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { BlogCard } from '../components/HomeSections/Blog';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-black">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 font-bold uppercase tracking-widest text-xs"
          >
            <FiArrowLeft /> Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="syne text-5xl md:text-8xl font-bold dark:text-white mb-6 tracking-tighter">
              Journal <span className="text-blue-600">Archive</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
              Exploring the intersection of code, design, and creativity. A full collection of articles and reflections.
            </p>
          </motion.div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <FiLoader size={48} className="text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} onClick={setSelectedPost} />
            ))}
          </div>
        )}
      </div>

      {/* Shared Post Modal logic */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[11000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-zinc-950 w-full max-w-4xl h-full max-h-[90vh] rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-10 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all backdrop-blur-md"
              >
                <FiX size={24} />
              </button>

              <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="relative aspect-video">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-transparent" />
                </div>

                <div className="p-8 md:p-16 -mt-32 relative">
                  <div className="flex items-center gap-3 mb-6 text-blue-600 text-sm font-bold uppercase tracking-widest bg-blue-600/5 w-fit px-4 py-2 rounded-full border border-blue-600/10">
                    <FiCalendar />
                    {selectedPost.date}
                  </div>
                  <h2 className="syne text-4xl md:text-6xl font-bold mb-10 dark:text-white leading-tight">
                    {selectedPost.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                      {selectedPost.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
