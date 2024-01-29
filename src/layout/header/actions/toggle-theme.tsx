import { IconPalette } from '@tabler/icons-react';

import { setMantineTheme, useMantineTheme } from '../../../contents';
import { Action } from './action';
import classes from './toggle-theme.module.css';

export const ToggleTheme = () => {
  const theme = useMantineTheme();
  const colors = Object.keys(theme.colors!);
  return (
    <Action
      tooltip={theme.primaryColor!}
      className={classes.theme}
      onClick={() => {
        const index = colors.findIndex((c) => c === theme.primaryColor);

        setMantineTheme({
          primaryColor: colors[index === colors.length - 1 ? 0 : index + 1],
        });
      }}>
      <IconPalette size={22} />
    </Action>
  );
};
