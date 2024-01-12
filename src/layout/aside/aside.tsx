import { observer } from '@legendapp/state/react';
import { Box, NavLink, ScrollArea } from '@mantine/core';
import clsx from 'clsx';
import NextLink from 'next/link';
import { Folder, MdxFile } from 'nextra';
import { useFSRoute } from 'nextra/hooks';

import { useStore } from '../../contents';
import classes from '../index.module.css';
import { MobileAside } from './mobile-aside';

type FolderWithoutChildren = Omit<Folder, 'children'>;

type DocsItem = (MdxFile | FolderWithoutChildren) & {
  title: string;
  type: string;
  children?: DocsItem[];
  firstChildRoute?: string;
  withIndexPage?: boolean;
  isUnderCurrentDocsTree?: boolean;
};

export const Aside = observer(() => {
  const store = useStore();
  const { activeThemeContext, activeType, docsDirectories } =
    store.normalizePages.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };
  const route = useFSRoute();

  const renderLinks = (item: DocsItem) => {
    if (!item.isUnderCurrentDocsTree) {
      return null;
    }

    if (
      item.type === 'menu' ||
      (item.children && (item.children.length || !item.withIndexPage))
    ) {
      return (
        <NavLink
          key={item.route}
          label={item.title}
          childrenOffset={16}
          defaultOpened={route.startsWith(item.route)}>
          {item.children?.map(renderLinks)}
        </NavLink>
      );
    }

    return (
      <NavLink
        active={
          !!(item.route && [route, route + '/'].includes(item.route + '/'))
        }
        component={NextLink}
        href={item.route}
        key={item.route}
        label={item.title}
      />
    );
  };
  const hideSidebar =
    !themeContext.sidebar ||
    themeContext.layout === 'raw' ||
    activeType === 'page';

  return (
    <>
      <Box
        component="aside"
        className={clsx(classes.aside, classes.desktop)}
        hidden={hideSidebar}>
        <ScrollArea h="calc(100vh - var(--infp-header-height))">
          {docsDirectories.map(renderLinks)}
        </ScrollArea>
      </Box>
      <MobileAside />
    </>
  );
});
