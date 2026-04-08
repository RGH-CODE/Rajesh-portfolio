import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTerminal } from '../context/TerminalContext';
import { motion } from 'framer-motion';
import { FiUpload, FiLogOut, FiCheckCircle, FiAlertCircle, FiLoader, FiImage } from 'react-icons/fi';
import axios from 'axios';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Admin = () => {
  const { logout } = useAuth();
  const { log } = useTerminal();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null); // 'success', 'error'

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
      
      // Save to Firestore for persistency
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

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="container max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="syne text-4xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400">Manage your gallery assets.</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors bg-white/5 px-4 py-2 rounded-xl"
          >
            <FiLogOut size={18} />
            Sign Out
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Upload Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-[2rem] bg-zinc-900/50"
          >
            <h2 className="syne text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FiUpload size={20} className="text-blue-600" />
              Upload New Photo
            </h2>

            <div 
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer mb-6 ${
                preview ? 'border-blue-600/50 bg-blue-600/5' : 'border-zinc-800 hover:border-zinc-700'
              }`}
              onClick={() => document.getElementById('file-upload').click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full aspect-video object-cover rounded-xl" />
              ) : (
                <>
                  <FiImage size={48} className="text-zinc-700 mb-4" />
                  <p className="text-gray-500 text-sm text-center">Click to browse or drag and drop image here</p>
                </>
              )}
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            {status === 'success' && (
              <div className="mb-6 flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-xl text-sm">
                <FiCheckCircle size={18} />
                Successfully uploaded to Cloudinary!
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-xl text-sm">
                <FiAlertCircle size={18} />
                Upload failed. Check console and configuration.
              </div>
            )}

            <button 
              disabled={!file || uploading}
              onClick={handleUpload}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? <FiLoader className="animate-spin" size={20} /> : 'Publish to Gallery'}
            </button>
          </motion.div>

          {/* Stats / Info Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-3xl bg-zinc-900/50">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Storage Info</h3>
              <div className="text-white">
                <div className="text-3xl font-bold mb-1">Cloudinary</div>
                <p className="text-gray-500 text-sm">Connected to your media library.</p>
              </div>
            </div>
            
            <div className="glass p-8 rounded-3xl bg-zinc-900/50">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Security</h3>
              <div className="text-white">
                <div className="text-3xl font-bold mb-1">Firebase</div>
                <p className="text-gray-500 text-sm">Authenticated session active.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
