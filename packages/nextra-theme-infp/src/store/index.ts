import { observable, observe } from '@legendapp/state';
import type { PageOpts } from 'nextra';

import { IS_BROWSER } from '@/constants';
import { defaultThemeConfig } from '@/constants/default-theme-config';
import type { ThemeConfig } from '@/constants/theme-schema';

export const store = observable<{
  themeConfig: ThemeConfig;
  pageOpts: PageOpts;
  pageProps: any;
}>({
  themeConfig: defaultThemeConfig,
  pageOpts: {} as PageOpts,
  pageProps: {},
});

observe(() => {
  if (IS_BROWSER) {
    console.log('Latest message', store.get(true));
  }
});
