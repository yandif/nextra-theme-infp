import { observable, observe } from '@legendapp/state';

import { IS_BROWSER } from '@/constants';

export const store = observable({ init: false, theme: 'light' });

observe(() => {
  if (IS_BROWSER) {
    console.log('Latest message', store.get(true));
  }
});
