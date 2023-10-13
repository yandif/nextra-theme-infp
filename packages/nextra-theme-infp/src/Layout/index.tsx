import { observer } from '@legendapp/state/react';
import type { NextraThemeLayoutProps } from 'nextra';
import type { FC } from 'react';
import React from 'react';

import { BackToTop } from '@/components/back-to-top';
import { StoreProvider } from '@/config/context';

import { Banner } from './banner';
import { Head } from './head';
import { Header } from './header';
import { ThemeProvider } from './theme-provider';

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  return (
    <StoreProvider value={context}>
      <ThemeProvider>
        <Head />
        <Banner />
        <Header />
        <div className="h-[1500px] flex justify-center">
          <span>{children}</span>
        </div>
        <BackToTop />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default observer(Layout);
