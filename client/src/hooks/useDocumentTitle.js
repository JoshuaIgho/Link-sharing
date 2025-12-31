import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} - LinkShare` : 'LinkShare - One Link for Everything';
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};