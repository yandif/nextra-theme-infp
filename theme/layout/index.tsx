import { observer } from '@legendapp/state/react';
import type { NextraThemeLayoutProps } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import type { FC, ReactNode } from 'react';

import { ActiveAnchorProvider } from '@/theme/content/active-anchor';
import { StoreProvider, useStore } from '@/theme/content/context';

import { Breadcrumb } from '../components/breadcrumb';
import { renderComponent } from '../utils/render';
import { Banner } from './banner';
import { Footer } from './footer';
import { Head } from './head';
import { Header } from './header';
import { getComponents } from './mdx-components';
import { ThemeProvider } from './theme-provider';

const Body = observer(({ children }: { children: ReactNode }) => {
  const components = useStore().themeConfig.components.get();

  return (
    <main className="infp-main w-full min-w-0 max-w-6xl px-6 pb-24 pt-4 md:px-12 min-h-[calc(100vh-var(--infp-header-height))]">
      <MDXProvider
        components={getComponents({
          isRawLayout: false,
          components,
        })}>
        <Breadcrumb />
        {children}
      </MDXProvider>
    </main>
  );
});

const Main = observer(({ children }: { children: ReactNode }) => {
  const store = useStore();
  const toc = store.themeConfig.toc.get();
  const { headings, filePath } = store.pageOpts.get();

  const tocEl = (
    <nav
      className="infp-toc order-last hidden w-64 shrink-0 md:block print:hidden px-4"
      aria-label="table of contents">
      {renderComponent(toc.component, {
        headings: toc.float ? headings : [],
        filePath,
      })}
    </nav>
  );

  return (
    <div className="mx-auto max-w-[90rem] flex">
      <ActiveAnchorProvider>
        <Body>{children}</Body>
        {tocEl}
      </ActiveAnchorProvider>
    </div>
  );
});

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  return (
    <StoreProvider value={context}>
      <ThemeProvider>
        <Head />
        <Banner />
        <Header />
        <Main>{children}</Main>
        <Footer />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default Layout;
