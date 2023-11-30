import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

import { cn } from '@/theme/utils/utils';

import { ArrowTopIcon } from './icons/arrow-top';
import { Button } from './ui/button';

export interface BackToTopProps {
  className?: string;
  children?: React.ReactNode;
}

export const BackToTop: FC<BackToTopProps> = ({ className, children }) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function toggleVisible() {
      const { scrollTop } = document.documentElement;
      ref.current?.classList.toggle('opacity-0', scrollTop < 300);
    }

    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <Button
      ref={ref}
      variant="outline"
      aria-hidden="true"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed right-6 bottom-6 flex items-center transition shadow-sm opacity-0',
        !children && 'p-0 w-8 h-8',
        className,
      )}>
      {children || <ArrowTopIcon className="w-4 h-4" />}
    </Button>
  );
};
