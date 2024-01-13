import { observable } from '@legendapp/state';

type LayoutStore = {
  navbarOpened: boolean;
  tocOpened: boolean;
};

export const layoutStore = observable<LayoutStore>({
  navbarOpened: false,
  tocOpened: true,
});
