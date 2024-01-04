import { observable } from '@legendapp/state';

type LayoutStore = {
  navbarOpened: boolean;
};

export const layoutStore = observable<LayoutStore>({
  navbarOpened: false,
});
