import { observer } from '@legendapp/state/react';
import { Box, Drawer, NavLink, ScrollArea } from '@mantine/core';
import clsx from 'clsx';
import NextLink from 'next/link';
import { useFSRoute } from 'nextra/hooks';
import { Item } from 'nextra/normalize-pages';
import { useEffect } from 'react';

import { layoutStore, useStore } from '../../contents';
import classes from '../index.module.css';

export const MobileAside = observer(() => {
  const store = useStore();
  const navbarOpened = layoutStore.navbarOpened.get();
  const directories = store.normalizePages.directories.get();
  const route = useFSRoute();

  useEffect(() => {
    if (navbarOpened) {
      layoutStore.navbarOpened.set(false);
    }
  }, [route]);

  useEffect(() => {
    if (navbarOpened) {
      document.body.classList.add(classes.body);
    } else {
      document.body.classList.remove(classes.body);
    }
  }, [navbarOpened]);

  const renderLinks = (item: Item) => {
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

  return (
    <Drawer
      withinPortal={false}
      component="aside"
      className={clsx(classes.mobile)}
      opened={navbarOpened}
      onClose={() => {}}
      size="100%"
      styles={{
        inner: { zIndex: 10, top: 'var(--infp-header-height)' },
        header: { display: 'none' },
        overlay: { display: 'none' },
      }}
      withCloseButton={false}
      lockScroll={false}>
      {directories.map(renderLinks)}
    </Drawer>
  );
});
