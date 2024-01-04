import { observer } from '@legendapp/state/react';
import { Box } from '@mantine/core';

import classes from '../index.module.css';

export const Footer = observer(() => {
  return <Box className={classes.footer}>footer</Box>;
});
