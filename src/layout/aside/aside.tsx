import { observer } from '@legendapp/state/react';
import { Box } from '@mantine/core';

import classes from '../index.module.css';

export const Aside = observer(() => {
  return (
    <Box component="aside" className={classes.aside}>
      aside
    </Box>
  );
});
