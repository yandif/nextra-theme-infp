import { observer } from '@legendapp/state/react';
import { Box } from '@mantine/core';

import { useStore } from '../../contents';
import classes from '../index.module.css';
import { Toc } from './toc/toc';

export const Navbar = observer(() => {
  const store = useStore();
  const activeType = store.normalizePages.activeType.get();
  const activeThemeContext = store.normalizePages.activeThemeContext.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };

  if (
    activeType === 'page' ||
    !themeContext.toc ||
    themeContext.layout !== 'default'
  ) {
    return null;
  }
  //   <nav
  //   className={clsx(classes.toc, 'nx-px-4')}
  //   aria-label="table of contents">
  //   <Toc />
  // </nav>
  return (
    <Box component="nav" className={classes.navbar}>
      <Toc />
    </Box>
  );
});
