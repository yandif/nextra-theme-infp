import { observer } from '@legendapp/state/react';
import { merge } from 'lodash';
import type { NextraThemeLayoutProps } from 'nextra';
import type { FC } from 'react';
import React, { useEffect } from 'react';

import { BackToTop } from '@/components/back-to-top';
import { defaultThemeConfig } from '@/constants/default-theme-config';
import { store } from '@/store';

import { Banner } from './banner';
import { Head } from './head';
import { Header } from './header';
import { ThemeProvider } from './theme-provider';

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  useEffect(() => {
    const { pageOpts, pageProps, themeConfig } = context;
    store.pageOpts.set(pageOpts);
    store.pageProps.set(pageProps);
    store.themeConfig.set(merge(defaultThemeConfig, themeConfig));
  }, []);

  // 2. 验证主题配置，是否符合模版
  // 3. 存储到状态中

  return (
    <ThemeProvider>
      <Head />
      <Banner />
      <Header />
      <div className="h-[1500px] px-80">{children}</div>
      <BackToTop />
    </ThemeProvider>
  );
};

export default observer(Layout);
