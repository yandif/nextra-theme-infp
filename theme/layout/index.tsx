import { observer } from '@legendapp/state/react';
import type { NextraThemeLayoutProps } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import type { FC } from 'react';
import React from 'react';

import { BackToTop } from '@/theme/components/back-to-top';
import { ActiveAnchorProvider } from '@/theme/config/active-anchor';
import { StoreProvider, useStore } from '@/theme/config/context';

import { renderComponent } from '../utils/render';
import { cn } from '../utils/utils';
import { Banner } from './banner';
import { Head } from './head';
import { Header } from './header';
import { getComponents } from './mdx-components';
import { ThemeProvider } from './theme-provider';

const Main = observer(({ children }: { children: React.ReactNode }) => {
  const components = useStore()?.themeConfig.components.get();
  return (
    <main className="infp-main w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
      <MDXProvider
        components={getComponents({
          isRawLayout: false,
          components,
        })}>
        {children}
      </MDXProvider>
    </main>
  );
});

const TOC = observer(() => {
  const config = useStore()?.themeConfig.get();
  const { headings, filePath } = useStore().pageOpts.get();
  return (
    <nav
      className={cn(
        cn('infp-toc order-last hidden w-64 shrink-0 md:block print:hidden'),
        'px-4',
      )}
      aria-label="table of contents">
      {renderComponent(config.toc.component, {
        headings: config.toc.float ? headings : [],
        filePath,
      })}
    </nav>
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
          <div className="flex">
            <Main>{children}</Main>
            <TOC />
          </div>
          <BackToTop />
        </ActiveAnchorProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default observer(Layout);
