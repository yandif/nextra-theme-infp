import { observer } from '@legendapp/state/react';
import { Box } from '@mantine/core';
import { MDXProvider } from 'nextra/mdx';
import type { ReactNode } from 'react';

import { useStore } from '../../contents';
import { ActiveAnchorProvider } from '../../contents/';
import { Aside } from '../aside/aside';
import classes from '../index.module.css';
import { Navbar } from '../navbar/navbar';
import { Body } from './body/body';
import { getComponents } from './mdx';

export const Main = observer(({ children }: { children: ReactNode }) => {
  const store = useStore();
  const activeThemeContext = store.normalizePages.activeThemeContext.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const components = store.themeConfig.components.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };

  const isRawLayout = themeContext.layout === 'raw';
  return (
    <Box
      component="main"
      className={classes.main}
      maw={isRawLayout ? undefined : '90rem'}>
      <ActiveAnchorProvider>
        <Aside />
        <Body>
          <MDXProvider components={getComponents({ isRawLayout, components })}>
            {children}
          </MDXProvider>
        </Body>
        <Navbar />
      </ActiveAnchorProvider>
    </Box>
  );
});
