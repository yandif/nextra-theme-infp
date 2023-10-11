import { observer } from '@legendapp/state/react';
import React from 'react';

import { cn } from '@/utils/utils';

export const Header = observer(() => {
  return (
    <div className="infp-header-container">
      <div
        className={cn(
          'infp-header-container-blur',
          'pointer-events-none absolute z-[-1] h-full w-full bg-white dark:bg-dark',
          'shadow-[0_2px_4px_rgba(0,0,0,.02),0_1px_0_rgba(0,0,0,.06)] dark:shadow-[0_-1px_0_rgba(255,255,255,.1)_inset]',
          'contrast-more:shadow-[0_0_0_1px_#000] contrast-more:dark:shadow-[0_0_0_1px_#fff]',
        )}
      />
      <nav className="mx-auto flex h-[var(--infp-header-height)] max-w-[90rem] items-center justify-end gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        Yandif
      </nav>
    </div>
  );
});
