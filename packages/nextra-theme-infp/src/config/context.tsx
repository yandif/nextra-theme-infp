import type { ObservableObject } from '@legendapp/state';
import { observable } from '@legendapp/state';
import { useObservable } from '@legendapp/state/react';
import type { PageOpts, ThemeConfig } from 'nextra';
import type { FC, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import { defaultThemeConfig, mergeThemeConfig } from './default-theme-config';

type Store = {
  themeConfig: ThemeConfig;
  pageOpts: PageOpts;
  pageProps: any;
};

const StoreContext = createContext<ObservableObject<Store>>(
  observable({
    themeConfig: defaultThemeConfig,
    pageOpts: {} as PageOpts,
    pageProps: {},
  }),
);

export const useStore = () => useContext(StoreContext);

export const StoreProvider: FC<{
  value: { pageOpts: PageOpts; pageProps: any; themeConfig: ThemeConfig };
  children: ReactNode;
}> = ({ children, value }) => {
  const { pageOpts, pageProps, themeConfig } = value;

  const store = useObservable<Store>({
    pageOpts,
    pageProps,
    themeConfig: mergeThemeConfig(themeConfig),
  });

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
