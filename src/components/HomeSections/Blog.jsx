import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiX, FiLoader, FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export const BlogCard = ({ post, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onClick={() => onClick(post)}
      className="group cursor-pointer group"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] mb-6 glass border border-zinc-200 dark:border-zinc-800">
        <img 
          src={post.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
          <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            Read Article <FiArrowRight />
          </span>
        </div>
      </div>
      
      <div className="px-2">
        <div className="flex items-center gap-3 mb-3 text-gray-500 text-xs font-bold uppercase tracking-widest">
          <FiCalendar className="text-blue-600" />
          {post.date}
        </div>
        <h3 className="syne text-2xl font-bold mb-3 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm leading-relaxed">
          {post.content}
        </p>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="blog" className="section-padding py-32 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="container px-6 mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="syne text-5xl md:text-7xl font-bold mb-6 dark:text-white tracking-tighter">
              Thoughts <span className="text-blue-600">&</span> Reflections
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Insights into my development process, technology trends, and personal projects.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px] bg-blue-600/5 px-6 py-3 rounded-full border border-blue-600/20">
              Latest Articles
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FiLoader size={40} className="text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post} onClick={setSelectedPost} />
              ))}
            </div>

            {posts.length > 3 && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-20 flex justify-center"
              >
                <Link 
                  to="/blogs"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white rounded-full font-bold overflow-hidden transition-all hover:pr-14"
                >
                  <span className="relative z-10 uppercase tracking-widest text-xs">View All Articles</span>
                  <FiArrowUpRight className="relative z-10 transition-all group-hover:scale-125" size={18} />
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
              </motion.div>
            )}

            {posts.length === 0 && (
              <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900/30 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-zinc-800">
                <p className="text-gray-400 font-medium">Stories are coming soon. Stay tuned!</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Post Modal */}
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
    </section>
  );
};

export default Blog;
