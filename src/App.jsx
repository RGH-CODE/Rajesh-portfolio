import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TerminalProvider, useTerminal } from './context/TerminalContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Login from './pages/Login';
import BlogPage from './pages/BlogPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Terminal from './components/Terminal';
import CustomCursor from './components/CustomCursor';
import Stickers from './components/Stickers';
import ScrollToHash from './components/ScrollToHash';
import { Navigate } from 'react-router-dom';
import VisitorTracker  from './context/VisitorTracker.jsx';
import PrivacyPolicy from './context/PrivacyPolicy.jsx'

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const { toggleTerminal, closeTerminal } = useTerminal();

  // Responsive Dev Mode Control
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        closeTerminal();
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeTerminal]);

  return (
    <>
    <VisitorTracker />
      <Loader onFinished={() => setLoading(false)} />
      <div className={`min-h-screen transition-opacity duration-1000 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <CustomCursor />
        <Navbar/>

        <ScrollToHash loading={loading} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/projects" element={<Navigate to="/#projects" replace />} />
            <Route path="/skills" element={<Navigate to="/#skills" replace />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Terminal />
        <div className="realistic-bg"></div>
        <div className="scanline"></div>
        <div className="noise"></div>
      </div>
    </>
  );
};

const App = () => {
  return (
  
    
    <AuthProvider>
      <TerminalProvider>
        <Router>
            
          <AppContent />
        </Router>
      </TerminalProvider>
    </AuthProvider>
  
  );
};

export default App;
