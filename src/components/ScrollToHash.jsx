import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = ({ loading }) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!loading && hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (!loading && !hash) {
       window.scrollTo(0, 0);
    }
  }, [hash, loading]);

  return null;
};

export default ScrollToHash;
