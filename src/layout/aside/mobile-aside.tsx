import { observer } from '@legendapp/state/react';
import { Drawer, NavLink } from '@mantine/core';
import clsx from 'clsx';
import NextLink from 'next/link';
import { useFSRoute, useMounted } from 'nextra/hooks';
import { Item } from 'nextra/normalize-pages';
import { useEffect } from 'react';

import { layoutStore, useStore } from '../../contents';
import classes from '../index.module.css';

export const MobileAside = observer(() => {
  const store = useStore();
  const navbarOpened = layoutStore.navbarOpened.get();
  const directories = store.normalizePages.directories.get();
  const route = useFSRoute();
  const mounted = useMounted();

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
          defaultOpened={route.startsWith(item.route)}
          className={classes.navLink}>
          {item.children?.map(renderLinks)}
        </NavLink>
      );
    }
    const active = !!(
      item.route && [route, route + '/'].includes(item.route + '/')
    );
    return (
      <NavLink
        active={active}
        component={NextLink}
        href={item.route}
        key={item.route}
        label={item.title}
        className={!active ? classes.navLink : undefined}
      />
    );
  };

  return (
    mounted && (
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
    )
  );
});
