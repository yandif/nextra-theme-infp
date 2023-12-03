import { observer } from '@legendapp/state/react';
import type { NextraThemeLayoutProps } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import type { FC } from 'react';
import React from 'react';

import { BackToTop } from '@/theme/components/back-to-top';
import { ActiveAnchorProvider } from '@/theme/config/active-anchor';
import { StoreProvider, useStore } from '@/theme/config/context';

import { Banner } from './banner';
import { Head } from './head';
import { Header } from './header';
import { getComponents } from './mdx-components';
import { ThemeProvider } from './theme-provider';

const Main = observer(({ children }: { children: React.ReactNode }) => {
  const components = useStore()?.themeConfig.components.get();
  return (
    <main className="infp-main h-[1500px] md:px-80">
      <span>
        <MDXProvider
          components={getComponents({
            isRawLayout: false,
            components,
          })}>
          {children}
        </MDXProvider>
      </span>
    </main>
  );
});

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  return (
    <StoreProvider value={context}>
      <ThemeProvider>
        <ActiveAnchorProvider>
          <Head />
          <Banner />
          <Header />
          <Main>{children}</Main>
          <BackToTop />
        </ActiveAnchorProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default observer(Layout);
