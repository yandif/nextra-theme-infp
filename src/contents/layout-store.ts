import { observable } from '@legendapp/state';

type LayoutStore = {
  navbarOpened: boolean;
  direction: 'ltr' | 'rtl';
};

export const layoutStore = observable<LayoutStore>({
  navbarOpened: false,
  direction: 'ltr',
});
