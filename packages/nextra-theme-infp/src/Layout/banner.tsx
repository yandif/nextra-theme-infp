import { observer } from '@legendapp/state/react';
import cn from 'clsx';
import React from 'react';

import { XIcon } from '@/components/icon';
import { store } from '@/store';
import { renderComponent } from '@/utils/render';

export const Banner = observer(() => {
  const banner = store.themeConfig.banner.get();
  if (!banner.text) {
    return null;
  }
  const hideBannerScript = `try{if(localStorage.getItem(${JSON.stringify(
    banner.key,
  )})==='0'){document.body.classList.add('infp-banner-hidden')}}catch(e){}`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: hideBannerScript }} />
      <div
        className={cn(
          'infp-banner-container sticky top-0 z-20 flex items-center md:relative',
          'h-[var(--infp-banner-height)] [body.infp-banner-hidden_&]:hidden',
          'text-slate-50 dark:text-white bg-neutral-900 dark:bg-[linear-gradient(1deg,#383838,#212121)]',
          'px-2 ltr:pl-10 rtl:pr-10 print:hidden',
        )}>
        <div className="w-full truncate px-4 text-center font-medium text-sm">
          {renderComponent(banner.text)}
        </div>
        {banner.dismissible && (
          <button
            type="button"
            aria-label="Dismiss banner"
            className="w-8 h-8 opacity-80 hover:opacity-100"
            onClick={() => {
              try {
                localStorage.setItem(banner.key, '0');
              } catch {
                /* ignore */
              }
              document.body.classList.add('infp-banner-hidden');
            }}>
            <XIcon className="mx-auto h-4 w-4" />
          </button>
        )}
      </div>
    </>
  );
});
