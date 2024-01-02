import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';

import { useLocale } from '../../../contents';
import { Action } from './action';
import classes from './theme-switch.module.css';

export function ThemeSwitchAction() {
  const locale = useLocale();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <Action
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
      tooltip={
        computedColorScheme === 'dark' ? locale.lightMode : locale.darkMode
      }>
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </Action>
  );
}
