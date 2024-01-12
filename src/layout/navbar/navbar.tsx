import { observer } from '@legendapp/state/react';
import { Box, Group, rem, Text } from '@mantine/core';
import { IconList } from '@tabler/icons-react';

import { BackToTop } from '../../components';
import { useLocale, useStore } from '../../contents';
import classes from '../index.module.css';
import { Toc } from './toc/toc';

export const Navbar = observer(() => {
  const store = useStore();
  const activeType = store.normalizePages.activeType.get();
  const activeThemeContext = store.normalizePages.activeThemeContext.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };
  const { backToTop } = store.themeConfig.toc.get();
  const locales = useLocale();

  const hiddenNav =
    activeType === 'page' ||
    !themeContext.toc ||
    themeContext.layout !== 'default';

  return (
    <Box component="nav">
      <Box className={classes.navbar} hidden={hiddenNav}>
        <Group h={rem(48)}>
          <IconList size={20} />
          <Text>{locales.tocTitle}</Text>
        </Group>
        <Toc />
        <Group h={rem(128)}></Group>
      </Box>
      {backToTop && <BackToTop />}
    </Box>
  );
});
