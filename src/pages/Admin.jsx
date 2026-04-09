import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTerminal } from '../context/TerminalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiLogOut, FiCheckCircle, FiAlertCircle, FiLoader, FiImage, FiPlus, FiTrash2, FiEdit, FiFileText, FiGrid, FiX } from 'react-icons/fi';
import axios from 'axios';
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc,
  updateDoc 
} from 'firebase/firestore';

const Admin = () => {
  const { logout } = useAuth();
  const { log } = useTerminal();
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery', 'blog'
  
  // Gallery State
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null); // 'success', 'error'
  
  // Blog State
  const [blogs, setBlogs] = useState([]);
  const [isEditingBlog, setIsEditingBlog] = useState(null); // id of blog being edited
  const [blogForm, setBlogForm] = useState({ title: '', content: '', imageUrl: '' });
  const [blogUploading, setBlogUploading] = useState(false);
  const [blogFile, setBlogFile] = useState(null);
  const [blogPreview, setBlogPreview] = useState(null);
  const [blogStatus, setBlogStatus] = useState(null);

  // Real-time listeners
  useEffect(() => {
    // Gallery listener
    const qGallery = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribeGallery = onSnapshot(qGallery, (snapshot) => {
      setGalleryImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Blog listener
    const qBlogs = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribeBlogs = onSnapshot(qBlogs, (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeGallery();
      unsubscribeBlogs();
    };
  }, []);

  // --- Gallery Handlers ---
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setStatus(null);
    log(`Starting upload to Cloudinary: ${file.name}`);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      
      log(`Upload successful! URL: ${response.data.secure_url}`);
      
      await addDoc(collection(db, 'gallery'), {
        url: response.data.secure_url,
        title: file.name.split('.')[0] || 'Gallery Image',
        createdAt: serverTimestamp()
      });
      log(`Meta-data synchronized with Firestore.`);

      setStatus('success');
      setFile(null);
      setPreview(null);
    } catch (err) {
      log(`Upload failed: ${err.message}`);
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteGallery = async (id, title) => {
    if (window.confirm(`Delete "${title}" from gallery?`)) {
      try {
        await deleteDoc(doc(db, 'gallery', id));
        log(`Deleted gallery item: ${title}`);
      } catch (err) {
        log(`Failed to delete gallery item: ${err.message}`);
      }
    }
  };

  // --- Blog Handlers ---
  const handleBlogFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setBlogFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setBlogPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogUploading(true);
    setBlogStatus(null);

    let imageUrl = blogForm.imageUrl;

    try {
      // 1. Upload new image if file selected
      if (blogFile) {
        log(`Uploading blog image to Cloudinary...`);
        const formData = new FormData();
        formData.append('file', blogFile);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        imageUrl = response.data.secure_url;
        log(`Blog image uploaded successfully.`);
      }

      // 2. Save/Update in Firestore
      if (isEditingBlog) {
        await updateDoc(doc(db, 'blogs', isEditingBlog), {
          ...blogForm,
          imageUrl,
          updatedAt: serverTimestamp()
        });
        log(`Blog post updated: ${blogForm.title}`);
      } else {
        await addDoc(collection(db, 'blogs'), {
          ...blogForm,
          date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
          imageUrl,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        log(`New blog post published: ${blogForm.title}`);
      }

      setBlogStatus('success');
      setBlogForm({ title: '', content: '', imageUrl: '' });
      setBlogFile(null);
      setBlogPreview(null);
      setIsEditingBlog(null);
    } catch (err) {
      log(`Blog operation failed: ${err.message}`);
      setBlogStatus('error');
    } finally {
      setBlogUploading(false);
    }
  };

  const handleEditBlog = (post) => {
    setIsEditingBlog(post.id);
    setBlogForm({ title: post.title, content: post.content, imageUrl: post.imageUrl });
    setBlogPreview(post.imageUrl);
    setActiveTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBlog = async (id, title) => {
    if (window.confirm(`Delete blog post "${title}"?`)) {
      try {
        await deleteDoc(doc(db, 'blogs', id));
        log(`Deleted blog post: ${title}`);
      } catch (err) {
        log(`Failed to delete blog post: ${err.message}`);
      }
    }
  };

  const cancelEdit = () => {
    setIsEditingBlog(null);
    setBlogForm({ title: '', content: '', imageUrl: '' });
    setBlogFile(null);
    setBlogPreview(null);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="container max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="syne text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">Admin Control</h1>
            <p className="text-gray-400">Manage your portfolio's digital footprint.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <nav className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800">
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'gallery' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                <FiGrid size={16} /> Gallery
              </button>
              <button 
                onClick={() => setActiveTab('blog')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'blog' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                <FiFileText size={16} /> Blog
              </button>
            </nav>
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors bg-zinc-900/50 p-3 rounded-xl border border-zinc-800"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'gallery' ? (
            <motion.div 
              key="gallery"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-1">
                <div className="glass p-8 rounded-[2rem] bg-zinc-900/50 sticky top-32 border border-zinc-800">
                  <h2 className="syne text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <FiPlus size={20} className="text-blue-600" />
                    Upload Photo
                  </h2>

                  <div 
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer mb-6 ${
                      preview ? 'border-blue-600/50 bg-blue-600/5' : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full aspect-square object-cover rounded-xl" />
                    ) : (
                      <>
                        <FiImage size={42} className="text-zinc-700 mb-4" />
                        <p className="text-gray-500 text-xs text-center leading-relaxed">Click to browse or drag and drop image here</p>
                      </>
                    )}
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </div>

                  {status === 'success' && <div className="mb-6 flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-xl text-xs"><FiCheckCircle size={16} /> Uploaded successfully!</div>}
                  {status === 'error' && <div className="mb-6 flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-xl text-xs"><FiAlertCircle size={16} /> Upload failed.</div>}

                  <button 
                    disabled={!file || uploading}
                    onClick={handleUpload}
                    className="btn btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {uploading ? <FiLoader className="animate-spin" size={20} /> : 'Publish to Gallery'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="relative group rounded-2xl overflow-hidden glass border border-zinc-800">
                      <img src={img.url} alt={img.title} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-300 font-bold uppercase truncate pr-4">{img.title}</span>
                          <button 
                            onClick={() => handleDeleteGallery(img.id, img.title)}
                            className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-lg transition-all"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="blog"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* Blog Form */}
              <div className="glass p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-800 h-fit">
                <header className="flex justify-between items-center mb-8">
                  <h2 className="syne text-xl font-bold text-white flex items-center gap-3">
                    {isEditingBlog ? <FiEdit size={20} className="text-blue-500" /> : <FiPlus size={20} className="text-blue-500" />}
                    {isEditingBlog ? 'Edit Post' : 'New Article'}
                  </h2>
                  {isEditingBlog && (
                    <button onClick={cancelEdit} className="text-gray-500 hover:text-white flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                      <FiX size={14} /> Cancel
                    </button>
                  )}
                </header>

                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2 ml-1">Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Catchy headline..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-3 text-white focus:border-blue-600 outline-none transition-all"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2 ml-1">Content (Supports Markdown)</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Write your story..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-3 text-white focus:border-blue-600 outline-none transition-all resize-none"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2 ml-1">Featured Image</label>
                    <div 
                      className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer ${
                        blogPreview ? 'border-blue-600/50 bg-blue-600/5' : 'border-zinc-800 hover:border-zinc-700'
                      }`}
                      onClick={() => document.getElementById('blog-image-upload').click()}
                    >
                      {blogPreview ? (
                        <img src={blogPreview} alt="Blog Preview" className="w-full aspect-video object-cover rounded-lg" />
                      ) : (
                        <FiImage size={32} className="text-zinc-700 mb-2" />
                      )}
                      <input id="blog-image-upload" type="file" className="hidden" onChange={handleBlogFileChange} accept="image/*" />
                    </div>
                  </div>

                  {blogStatus === 'success' && <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-xl text-xs font-bold uppercase tracking-wider"><FiCheckCircle size={16} /> Action Completed!</div>}

                  <button 
                    type="submit"
                    disabled={blogUploading}
                    className="btn btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {blogUploading ? <FiLoader className="animate-spin" size={20} /> : (isEditingBlog ? 'Update Post' : 'Publish Article')}
                  </button>
                </form>
              </div>

              {/* Blog List */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500 mb-4 flex items-center gap-2">
                  Published Posts <span className="bg-zinc-800 text-white px-2 py-0.5 rounded-full text-[9px]">{blogs.length}</span>
                </h3>
                
                <div className="space-y-4">
                  {blogs.map((post) => (
                    <div key={post.id} className="glass p-5 rounded-2xl border border-zinc-800/50 flex gap-5 group hover:border-zinc-700 transition-all">
                      <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-white font-bold leading-tight line-clamp-2 mb-1">{post.title}</h4>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{post.date}</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditBlog(post)}
                            className="bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <FiEdit size={12} /> Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteBlog(post.id, post.title)}
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <FiTrash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {blogs.length === 0 && (
                    <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-zinc-900 border-dashed">
                      <p className="text-gray-600 text-sm">No blog posts found.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;

