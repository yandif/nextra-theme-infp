import type { ObservableObject } from '@legendapp/state';
import { observable } from '@legendapp/state';
import { useObservable } from '@legendapp/state/react';
import type { PageOpts } from 'nextra';
import type { FC, ReactNode } from 'react';
import React, { createContext, useContext, useEffect } from 'react';

import { defaultThemeConfig, mergeThemeConfig } from './default-theme-config';
import type { ThemeConfig } from './theme-schema';

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

  useEffect(() => {
    console.log(store.get(true));
  }, []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};