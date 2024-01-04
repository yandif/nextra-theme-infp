import { observer } from '@legendapp/state/react';
import { Box, rem } from '@mantine/core';
import { useRouter } from 'next/router';
import { useMounted } from 'nextra/hooks';

import { useLocale, useStore } from '../../../contents';
import classes from './timestamp.module.css';

export const Timestamp = observer(() => {
  const store = useStore();
  const { locale = 'zh-CN' } = useRouter();
  const locales = useLocale();
  const mounted = useMounted();
  const activeType = store.normalizePages.activeType.get();
  const activeThemeContext = store.normalizePages.activeThemeContext.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const timestamp = store.pageOpts.timestamp.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };

  const date = themeContext.timestamp && timestamp ? new Date(timestamp) : null;

  return mounted && date && activeType !== 'page' ? (
    <Box className={classes.root}>
      {locales.lastUpdate}{' '}
      <time dateTime={date.toISOString()}>
        {date.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>
    </Box>
  ) : (
    <Box mt={rem(64)}></Box>
  );
});
