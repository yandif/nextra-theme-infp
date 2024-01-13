import { observer } from '@legendapp/state/react';
import { ActionIcon, Box, Group, rem, Text } from '@mantine/core';
import { IconList } from '@tabler/icons-react';

import { BackToTop } from '../../components';
import { layoutStore, useLocale, useStore } from '../../contents';
import classes from '../index.module.css';
import { Toc } from './toc/toc';

export const Navbar = observer(() => {
  const store = useStore();
  const activeType = store.normalizePages.activeType.get();
  const activeThemeContext = store.normalizePages.activeThemeContext.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };
  const { backToTop } = store.themeConfig.toc.get();
  const tocOpened = layoutStore.tocOpened.get();
  const locales = useLocale();

  const toggle = () => layoutStore.tocOpened.set(!tocOpened);

  const hiddenNav =
    activeType === 'page' ||
    !themeContext.toc ||
    themeContext.layout !== 'default';

  if (tocOpened) {
    return (
      <ActionIcon
        variant="transparent"
        onClick={toggle}
        className={classes.navbarIcon}>
        <IconList size={20} />
      </ActionIcon>
    );
  }

  return (
    <Box component="nav">
      <Box className={classes.navbar} hidden={hiddenNav}>
        <Group h={rem(48)}>
          <ActionIcon variant="transparent" onClick={toggle}>
            <IconList size={20} />
          </ActionIcon>
          <Text>{locales.tocTitle}</Text>
        </Group>
        <Toc />
        <Group h={rem(128)}></Group>
      </Box>
      {backToTop && <BackToTop />}
    </Box>
  );
});
