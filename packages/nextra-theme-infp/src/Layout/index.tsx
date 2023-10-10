import { observer } from '@legendapp/state/react';
import Head from 'next/head';
import type { NextraThemeLayoutProps } from 'nextra';
import type { FC } from 'react';
import React, { useEffect } from 'react';

import { BackToTop } from '@/components/back-to-top';
import { Button } from '@/components/ui/button';
import { store } from '@/store';

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  useEffect(() => {
    store.set({ init: true, theme: 'dark', ...context });
  }, []);
  if (!store.init.get()) return null;

  const { pageOpts } = context;
  const { title, frontMatter, headings } = pageOpts;
  const theme = store.theme.get();

  return (
    <div className={theme}>
      <div className="bg-container">
        <Button
          onClick={() => {
            store.theme.set(theme === 'light' ? 'dark' : 'light');
          }}>
          切换
        </Button>
        <Head>
          <title>{title}</title>
          <meta name="og:image" content={frontMatter.image} />
        </Head>
        Table of Contents:
        <ul>
          {headings.map((heading) => (
            <li key={heading.value}>{heading.value}</li>
          ))}
        </ul>
        <div style={{ border: '1px solid', minHeight: '1000px' }}>
          {children}
        </div>
        <BackToTop />
      </div>
    </div>
  );
};

export default observer(Layout);
