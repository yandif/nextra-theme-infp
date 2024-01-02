import { observer } from '@legendapp/state/react';
import { useComputedColorScheme } from '@mantine/core';
import { isFunction } from 'lodash';
import NextHead from 'next/head';
import { NextSeo } from 'next-seo';
import { useMounted } from 'nextra/hooks';

import { useStore } from '../../contents';

const darkBg = '#1c2127';
const lightBg = '#f7f7f7';

export const Head = observer(() => {
  const store = useStore();
  const mounted = useMounted();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const { head, faviconGlyph } = store.themeConfig.get();
  const { title, frontMatter } = store.pageOpts.get();

  return (
    <>
      <NextSeo
        title={title}
        description={frontMatter.description}
        canonical={frontMatter.canonical}
        openGraph={frontMatter.openGraph}
      />
      <NextHead>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        {faviconGlyph && (
          <link
            rel="icon"
            href={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='.9em' font-size='90' text-anchor='middle'>${faviconGlyph}</text><style>text{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";fill:black}@media(prefers-color-scheme:dark){text{fill:white}}</style></svg>`}
          />
        )}
        {mounted ? (
          <meta
            name="theme-color"
            content={computedColorScheme === 'dark' ? darkBg : lightBg}
          />
        ) : (
          <>
            <meta
              name="theme-color"
              content={lightBg}
              media="(prefers-color-scheme: light)"
            />
            <meta
              name="theme-color"
              content={darkBg}
              media="(prefers-color-scheme: dark)"
            />
          </>
        )}
        {isFunction(head) ? head({}) : head}
      </NextHead>
    </>
  );
});
