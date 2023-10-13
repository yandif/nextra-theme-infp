import { observer, useObservable } from '@legendapp/state/react';
import type { NextraThemeLayoutProps } from 'nextra';
import type { FC } from 'react';
import React from 'react';

import { BackToTop } from '@/components/back-to-top';
import type { INFPConfig } from '@/config/context';
import { ConfigProvider } from '@/config/context';
import { mergeThemeConfig } from '@/config/default-theme-config';

import { Banner } from './banner';
import { Head } from './head';
import { Header } from './header';
import { ThemeProvider } from './theme-provider';

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  return (
    <ConfigProvider value={context}>
      <ThemeProvider>
        <Head />
        <Banner />
        <Header />
        <div className="h-[1500px] flex justify-center">
          <span>{children}</span>
        </div>
        <BackToTop />
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default observer(Layout);
