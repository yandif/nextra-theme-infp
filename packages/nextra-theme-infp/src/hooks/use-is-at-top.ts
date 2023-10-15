import { useEffect, useState } from 'react';

export const useIsAtTop = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const handleScroll = () => {
    setIsAtTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isAtTop;
};
