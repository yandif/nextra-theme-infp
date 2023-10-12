import { observer } from '@legendapp/state/react';
import type { NextraThemeLayoutProps } from 'nextra';
import type { FC } from 'react';
import React from 'react';

import { BackToTop } from '@/components/back-to-top';
import {
  DEEP_OBJECT_KEYS,
  defaultThemeConfig,
} from '@/constants/default-theme-config';
import { store } from '@/store';

import { Banner } from './banner';
import { Head } from './head';
import { Header } from './header';
import { ThemeProvider } from './theme-provider';

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  const { pageOpts, pageProps, themeConfig } = context;
  store.pageOpts.set(pageOpts);
  store.pageProps.set(pageProps);
  store.themeConfig.set({
    ...defaultThemeConfig,
    ...Object.fromEntries(
      Object.entries(themeConfig).map(([key, value]) => [
        key,
        value && typeof value === 'object' && DEEP_OBJECT_KEYS.includes(key)
          ? {
              ...(defaultThemeConfig[
                key as keyof typeof defaultThemeConfig
              ] as {}),
              ...value,
            }
          : value,
      ]),
    ),
    title: pageOpts.title,
  });

  // 2. 验证主题配置，是否符合模版
  // 3. 存储到状态中

  return (
    <ThemeProvider>
      <Head />
      <Banner />
      <Header />
      <div className="h-[1500px]">{children}</div>
      <BackToTop />
    </ThemeProvider>
  );
};

export default observer(Layout);
