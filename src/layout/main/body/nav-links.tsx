import { observer } from '@legendapp/state/react';
import { Anchor } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import NextLink from 'next/link';

import { useStore } from '../../../contents';
import classes from './nav-links.module.css';

export const NavLinks = observer(() => {
  const store = useStore();
  const { activeType, activeIndex, flatDocsDirectories, activeThemeContext } =
    store.normalizePages.get();
  const nav = store.themeConfig.navigation.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };

  if (activeType === 'page' || !themeContext.pagination) {
    return null;
  }

  const navigation = typeof nav === 'boolean' ? { prev: nav, next: nav } : nav;
  let prev = navigation.prev && flatDocsDirectories[activeIndex - 1];
  let next = navigation.next && flatDocsDirectories[activeIndex + 1];

  if (prev && !prev.isUnderCurrentDocsTree) prev = false;
  if (next && !next.isUnderCurrentDocsTree) next = false;

  if (!prev && !next) return null;

  return (
    <div className={classes.root}>
      {prev && (
        <Anchor
          component={NextLink}
          className={classes.prev}
          href={prev.route}
          title={prev.title}
          underline="never">
          <IconChevronLeft
            style={{ minWidth: '16px', width: '16px' }}
            stroke={3}
          />
          {prev.title}
        </Anchor>
      )}
      {next && (
        <Anchor
          component={NextLink}
          className={classes.next}
          href={next.route}
          title={next.title}
          underline="never">
          {next.title}
          <IconChevronRight
            style={{ minWidth: '16px', width: '16px' }}
            stroke={3}
          />
        </Anchor>
      )}
    </div>
  );
});
