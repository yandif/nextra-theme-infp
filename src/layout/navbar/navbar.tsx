import { observer } from '@legendapp/state/react';
import { Box } from '@mantine/core';

import classes from '../index.module.css';

export const Navbar = observer(() => {
  return (
    <Box component="nav" className={classes.navbar}>
      navbar
    </Box>
  );
});
