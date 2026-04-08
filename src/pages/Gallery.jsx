import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal } from '../context/TerminalContext';
import axios from 'axios';
import { FiLoader, FiPlus, FiImage } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { log } = useTerminal();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // In a real app, you'd fetch from your backend or use Cloudinary Resource API
    // Since we're client-side, we'll simulate fetching or use a specific tag-based URL if enabled
    // For now, we'll demonstrate with placeholders if no credentials, 
    // but the logic for fetching is ready.

    log("Connecting to Firestore gallery stream...");

    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));

    // Set up real-time listener for the gallery collection
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbImages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (dbImages.length > 0) {
        setImages(dbImages);
        log(`Synced ${dbImages.length} images from database.`);
      } else {
        // Fallback to placeholders if db is empty or still initializing
        setImages([
          { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', title: 'Code Focus' },
          { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', title: 'Coffee & Code' }
        ]);
        log("Gallery is empty in database. Showing defaults.");
      }
      setLoading(false);
    }, (error) => {
      log(`Database error: ${error.message}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [log]);

  return (
    <div className="gallery-page min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="syne text-5xl md:text-7xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-gray-400">Capturing moments and milestones.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FiLoader className="text-blue-600 animate-spin" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(img)}
                className="relative aspect-square overflow-hidden rounded-3xl cursor-pointer group glass"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <span className="text-white font-bold tracking-widest uppercase text-sm">{img.title}</span>
                </div>
              </motion.div>
            ))}

            {/* Admin Add Link */}
            <Link 
              to="/admin"
              className="relative aspect-square overflow-hidden rounded-3xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600 hover:border-blue-600 hover:text-blue-600 transition-all group glass"
            >
              <FiPlus size={48} className="group-hover:scale-110 transition-transform" />
              <span className="mt-4 font-bold uppercase tracking-widest text-xs">Add Photos</span>
            </Link>

          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[20000] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
