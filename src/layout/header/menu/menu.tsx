import { observer } from '@legendapp/state/react';
import { Anchor, Group } from '@mantine/core';
import cx from 'clsx';
import NextLink from 'next/link';
import { useFSRoute } from 'nextra/hooks';
import { MenuItem, PageItem } from 'nextra/normalize-pages';

import { useStore } from '../../../contents';
import classes from './menu.module.css';

export const Menu = observer(() => {
  const store = useStore();
  const activeRoute = useFSRoute();
  const items = store.normalizePages.topLevelNavbarItems.get();

  return (
    <Group gap="md" wrap="nowrap">
      {items.map((pageOrMenu) => {
        if (pageOrMenu.display === 'hidden') return null;

        if (pageOrMenu.type === 'menu') {
          const menu = pageOrMenu as MenuItem;
          // return (
          //   <NavbarMenu
          //     key={menu.title}
          //     className={cx(classes.link, 'nx-flex nx-gap-1', classes.inactive)}
          //     menu={menu}>
          //     {menu.title}
          //     <ArrowRightIcon
          //       className="nx-h-[18px] nx-min-w-[18px] nx-rounded-sm nx-p-0.5"
          //       pathClassName="nx-origin-center nx-transition-transform nx-rotate-90"
          //     />
          //   </NavbarMenu>
          // );
        }
        const page = pageOrMenu as PageItem;
        let href = page.href || page.route || '#';

        // If it's a directory
        if (page.children) {
          href =
            (page.withIndexPage ? page.route : page.firstChildRoute) || href;
        }

        const isActive =
          page.route === activeRoute ||
          activeRoute.startsWith(page.route + '/');

        return (
          <Anchor
            key={href}
            href={href}
            component={NextLink}
            underline="never"
            className={cx(
              classes.text,
              !isActive || page.newWindow ? classes.inactive : classes.active,
            )}
            target={page.newWindow ? '_blank' : '_self'}
            aria-current={!page.newWindow && isActive}>
            {page.title}
          </Anchor>
        );
      })}
    </Group>
  );
});
