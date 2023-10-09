import Head from 'next/head';
import type { NextraThemeLayoutProps } from 'nextra';
import React from 'react';

import { BackToTop } from '@/components/back-to-top';
import { Button } from '@/components/ui/button';
import { store } from '@/store';

export default function Layout({
  children,
  ...context
}: NextraThemeLayoutProps) {
  store.set({ init: true, ...context });
  const { pageOpts } = context;
  const { title, frontMatter, headings } = pageOpts;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="og:image" content={frontMatter.image} />
      </Head>
      <Button>My Theme</Button>
      Table of Contents:
      <ul>
        {headings.map((heading) => (
          <li key={heading.value}>{heading.value}</li>
        ))}
      </ul>
      <div style={{ border: '1px solid', minHeight: '1000px' }}>{children}</div>
      <BackToTop>回到顶部</BackToTop>
    </div>
  );
}
