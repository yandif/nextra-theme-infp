import cn from 'clsx';
import { ArrowRightIcon } from 'nextra/icons';
import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

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
      aria-hidden="true"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed right-4 bottom-4 flex items-center transition shadow-md opacity-0',
        !children && 'p-0 w-8 h-8',
        className,
      )}>
      {children || <ArrowRightIcon className="-rotate-90 w-4 h-4" />}
    </Button>
  );
};
