import { observer } from '@legendapp/state/react';
import { Box, Burger, Group } from '@mantine/core';
import cx from 'clsx';

import { layoutStore } from '../../contents';
import classes from '../index.module.css';
import { Actions } from './actions';
import { Logo } from './logo/logo';
import { Menu } from './menu/menu';

export const Header = observer(() => {
  const navbarOpened = layoutStore.navbarOpened.get();
  const onNavbarToggle = () => {
    layoutStore.navbarOpened.set(!navbarOpened);
  };

  return (
    <>
      <Group
        component="header"
        className={cx(classes.header, classes.desktop)}
        justify="space-between"
        align="center"
        w="100%"
        wrap="nowrap">
        <Logo />
        <Group gap="xl" wrap="nowrap">
          <Menu />
          <Actions />
        </Group>
      </Group>
      <Group
        component="header"
        className={cx(classes.header, classes.mobile)}
        justify="space-between"
        align="center"
        w="100%"
        wrap="nowrap">
        <Box miw={80}>
          <Burger
            opened={navbarOpened}
            onClick={onNavbarToggle}
            size="sm"
            aria-label="Toggle navbar"
          />
        </Box>
        <Logo />
        <Actions />
      </Group>
    </>
  );
});
