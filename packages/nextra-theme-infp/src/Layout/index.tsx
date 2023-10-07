import Head from 'next/head';
import type { NextraThemeLayoutProps } from 'nextra';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function Layout({
  children,
  ...context
}: NextraThemeLayoutProps) {
  // console.log(context);
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
      <div style={{ border: '1px solid' }}>{children}</div>
    </div>
  );
}
