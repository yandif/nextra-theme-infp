import cn from 'clsx';
import { ArrowRightIcon } from 'nextra/icons';
import type { ReactElement } from 'react';
import React, { useEffect, useRef } from 'react';

import { Button } from './ui/button';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function BackToTop({ className }: { className?: string }): ReactElement {
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
      onClick={scrollToTop}
      className={cn(
        'fixed right-4 bottom-4 flex items-center p-0 w-8 h-8 transition shadow-md opacity-0',
        className,
      )}>
      <ArrowRightIcon className="-rotate-90 w-4 h-4" />
    </Button>
  );
}
