import { observer } from '@legendapp/state/react';
import { Anchor, Center, Group, Menu as IMenu, Text } from '@mantine/core';
import cx from 'clsx';
import NextLink from 'next/link';
import { useFSRoute } from 'nextra/hooks';
import { MenuItem, PageItem } from 'nextra/normalize-pages';

import { useStore } from '../../../contents';
import classes from './menu.module.css';

type ItemType = 'divider' | 'label' | undefined;

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
          const { items } = menu;
          const routes = Object.fromEntries(
            (menu.children || []).map((route) => [route.name, route]),
          );
          return (
            <IMenu
              key={menu.title}
              trigger="hover"
              shadow="md"
              withArrow
              transitionProps={{ transition: 'pop', duration: 150 }}
              openDelay={100}
              closeDelay={300}>
              <IMenu.Target>
                <Text className={cx(classes.dropText)}>{menu.title}</Text>
              </IMenu.Target>
              <IMenu.Dropdown miw={100}>
                {Object.entries(items || {}).map(([key, item]) => {
                  const type = (item as any).type as ItemType;
                  if (type === 'divider') {
                    console.log(key);
                    return <IMenu.Divider key={key} />;
                  }
                  if (type === 'label') {
                    return <IMenu.Label key={key}>{item.title}</IMenu.Label>;
                  }
                  return (
                    <IMenu.Item
                      key={key}
                      component={NextLink}
                      href={
                        item.href ||
                        routes[key]?.route ||
                        menu.route + '/' + key
                      }
                      target={item.newWindow ? '_blank' : '_self'}>
                      <Center maw={250}>
                        <Text truncate="end">{item.title || key}</Text>
                      </Center>
                    </IMenu.Item>
                  );
                })}
              </IMenu.Dropdown>
            </IMenu>
          );
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
