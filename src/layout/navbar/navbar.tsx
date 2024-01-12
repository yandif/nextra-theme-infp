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

  const hiddenNav =
    activeType === 'page' ||
    !themeContext.toc ||
    themeContext.layout !== 'default';

  return (
    <Box component="nav" className={classes.navbar} hidden={hiddenNav}>
      <Toc />
    </Box>
  );
});
