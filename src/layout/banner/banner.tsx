import { observer } from '@legendapp/state/react';
import { ActionIcon, Box } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useMounted } from 'nextra/hooks';
import { useEffect, useState } from 'react';
import { useStore } from '../../contents';
import { renderComponent } from '../../utils';
import classes from '../index.module.css';

export const Banner = observer(() => {
  const [hidden, setHidden] = useState(true);
  const banner = useStore().themeConfig.banner.get();
  const mounted = useMounted();

  useEffect(() => {
    if (!localStorage.getItem(banner.key)) {
      setHidden(false);
    }
  }, []);

  return (
    <Box
      className={classes.banner}
      data-hidden={hidden || !banner.text || !mounted}>
      <div className={classes.bannerText}>{renderComponent(banner.text)}</div>
      {banner.dismissible && (
        <ActionIcon
          size="sm"
          variant="transparent"
          className={classes.bannerIcon}
          onClick={() => {
            localStorage.setItem(banner.key, '0');
            setHidden(true);
          }}>
          <IconX />
        </ActionIcon>
      )}
    </Box>
  );
});
