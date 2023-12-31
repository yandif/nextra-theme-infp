import { observer } from '@legendapp/state/react';
import { Box } from '@mantine/core';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import { useStore } from '../../../contents';
import classes from './body.module.css';
import { Breadcrumbs } from './breadcrumbs';
import { NavLinks } from './nav-links';
import { Timestamp } from './timestamp';

export const Body = observer(({ children }: { children: ReactNode }) => {
  const store = useStore();
  const activeThemeContext = store.normalizePages.activeThemeContext.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };

  const className = {
    default: classes.default,
    raw: classes.raw,
    full: classes.full,
  }[themeContext.layout];

  return (
    <Box component="article" className={clsx(classes.body, className)}>
      <Breadcrumbs />
      {children}
      <Timestamp />
      <NavLinks />
    </Box>
  );
});
