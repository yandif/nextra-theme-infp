import cn from 'clsx';
import type { ComponentProps, FC } from 'react';
import React, { useCallback, useRef } from 'react';

import { CopyToClipboard } from '../copy-to-clipboard';
import { WordWrapIcon } from '../icons';
import { Button } from '../ui/button';

type PreProps = ComponentProps<'pre'> & {
  filename?: string;
  hasCopyCode?: boolean;
};

export const Pre: FC<PreProps> = ({
  children,
  className,
  hasCopyCode,
  filename,
  ...props
}) => {
  const preRef = useRef<HTMLPreElement | null>(null);

  const toggleWordWrap = useCallback(() => {
    const htmlDataset = document.documentElement.dataset;
    const hasWordWrap = 'infpWordWrap' in htmlDataset;
    if (hasWordWrap) {
      delete htmlDataset.infpWordWrap;
    } else {
      htmlDataset.infpWordWrap = '';
    }
  }, []);

  return (
    <div className="infp-code-block relative mt-6 first:mt-0">
      {filename && (
        <div className="absolute top-0 z-[1] w-full truncate rounded-t-xl bg-card text-card-foreground  py-2 px-4 text-xs">
          {filename}
        </div>
      )}
      <pre
        className={cn(
          'bg-card mb-4 overflow-x-auto rounded-xl subpixel-antialiased text-[.9em]',
          'contrast-more:border contrast-more:border-primary-900/20 contrast-more:contrast-150 contrast-more:dark:border-primary-100/40',
          filename ? 'pt-12 pb-4' : 'py-4',
          className,
        )}
        ref={preRef}
        {...props}>
        {children}
      </pre>
      <div
        className={cn(
          'opacity-0 transition [div:hover>&]:opacity-100 focus-within:opacity-100',
          'flex gap-1 absolute m-[11px] right-0',
          filename ? 'top-8' : 'top-0',
        )}>
        <Button
          variant="outline"
          onClick={toggleWordWrap}
          className="md:hidden  min-w-[36px] w-[36px] p-0 flex items-center justify-center"
          title="Toggle word wrap">
          <WordWrapIcon className="pointer-events-none h-4 w-4" />
        </Button>
        {hasCopyCode && (
          <CopyToClipboard
            className="infp-copy-icon"
            getValue={() =>
              preRef.current?.querySelector('code')?.textContent || ''
            }
          />
        )}
      </div>
    </div>
  );
};
