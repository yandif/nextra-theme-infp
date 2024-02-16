import { observer } from '@legendapp/state/react';
import { Box } from '@mantine/core';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import { useStore } from '../../../contents';
import classes from './body.module.css';
import { Breadcrumbs } from './breadcrumbs';
import { Comments } from './comments';
import { NavLinks } from './nav-links';
import { Timestamp } from './timestamp';

export const Body = observer(({ children }: { children: ReactNode }) => {
  const store = useStore();
  const { activeThemeContext, activeType } = store.normalizePages.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };

  const className = {
    default: classes.default,
    raw: classes.raw,
    full: classes.full,
  }[themeContext.layout];

  const pageClassName = {
    page: classes.page,
    doc: classes.doc,
  }[activeType!];

  return (
    <Box
      component="article"
      className={clsx(classes.body, className, pageClassName)}>
      <Breadcrumbs />
      {children}
      <Timestamp />
      <NavLinks />
      <Comments />
    </Box>
  );
});
