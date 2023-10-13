import { observer } from '@legendapp/state/react';
import { isFunction } from 'lodash';
import NextHead from 'next/head';
import type { NextSeoProps } from 'next-seo';
import { NextSeo } from 'next-seo';
import { useTheme } from 'next-themes';
import { useMounted } from 'nextra/hooks';
import React from 'react';

import { useConfig } from '@/config/context';

export const Head = observer(() => {
  const context = useConfig();
  const config = context.themeConfig.get();
  const pageOpts = context.pageOpts.get();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const head = isFunction(config.head) ? config.head({}) : config.head;
  console.log(pageOpts);
  const frontMatter = pageOpts.frontMatter as NextSeoProps;

  return (
    <>
      <NextSeo
        title={pageOpts.title}
        description={frontMatter.description}
        canonical={frontMatter.canonical}
        openGraph={frontMatter.openGraph}
        {...config.useNextSeoProps?.()}
      />
      <NextHead>
        {config.faviconGlyph ? (
          <link
            rel="icon"
            href={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='.9em' font-size='90' text-anchor='middle'>${config.faviconGlyph}</text><style>text{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";fill:black}@media(prefers-color-scheme:dark){text{fill:white}}</style></svg>`}
          />
        ) : null}
        {mounted ? (
          <meta
            name="theme-color"
            content={resolvedTheme === 'dark' ? '#1c2127' : '#f5f5f5'}
          />
        ) : (
          <>
            <meta
              name="theme-color"
              content="#f5f5f5"
              media="(prefers-color-scheme: light)"
            />
            <meta
              name="theme-color"
              content="#1c2127"
              media="(prefers-color-scheme: dark)"
            />
          </>
        )}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        {isFunction(head) ? head({}) : head}
      </NextHead>
    </>
  );
});
