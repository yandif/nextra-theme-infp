import { observer } from '@legendapp/state/react';
import { Anchor, Breadcrumbs as MantineBreadcrumbs, Text } from '@mantine/core';
import NextLink from 'next/link';

import { useStore } from '../../../contents';
import classes from './breadcrumbs.module.css';

export const Breadcrumbs = observer(() => {
  const store = useStore();
  const { activePath, activeType, activeThemeContext } =
    store.normalizePages.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };
  if (activeType === 'page' || !themeContext.breadcrumb) return null;

  return (
    <MantineBreadcrumbs fz="xs" separator=">">
      {activePath.map((item, index) => {
        const isLink = !item.children || item.withIndexPage;
        const isActive = index === activePath.length - 1;

        if (isLink && !isActive) {
          return (
            <Anchor
              key={item.route + item.name}
              component={NextLink}
              href={item.route}
              underline="never">
              {item.title}
            </Anchor>
          );
        }

        return (
          <Text
            key={item.route + item.name}
            className={isActive ? classes.active : classes.text}>
            {item.title}
          </Text>
        );
      })}
    </MantineBreadcrumbs>
  );
});
