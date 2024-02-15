import { observer } from '@legendapp/state/react';
import { Box } from '@mantine/core';

import { useStore } from '../../contents';
import { renderComponent } from '../../utils';
import classes from '../index.module.css';

export const Footer = observer(() => {
  const store = useStore();
  const component = store.themeConfig.get().footer;

  return <Box className={classes.footer}>{renderComponent(component)}</Box>;
});
