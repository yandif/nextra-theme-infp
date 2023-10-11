import { observable, observe } from '@legendapp/state';

import { IS_BROWSER } from '@/constants';
import { DefaultThemeSchema } from '@/constants/default-theme-schema';
import type { ThemeSchema } from '@/constants/theme-schema';

export const store = observable<{ themeSchema: ThemeSchema }>({
  themeSchema: DefaultThemeSchema,
});

observe(() => {
  if (IS_BROWSER) {
    console.log('Latest message', store.get(true));
  }
});
