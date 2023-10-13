import type { ObservableObject } from '@legendapp/state';
import { observable } from '@legendapp/state';
import { useObservable } from '@legendapp/state/react';
import type { PageOpts, ThemeConfig } from 'nextra';
import type { FC, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import { defaultThemeConfig, mergeThemeConfig } from './default-theme-config';

type Config = {
  themeConfig: ThemeConfig;
  pageOpts: PageOpts;
  pageProps: any;
};

const config: ObservableObject<Config> = observable({
  themeConfig: defaultThemeConfig,
  pageOpts: {} as PageOpts,
  pageProps: {},
});

const ConfigContext = createContext(config);

export const useConfig = () => useContext(ConfigContext);

export type ConfigProviderProps = {
  value: { pageOpts: PageOpts; pageProps: any; themeConfig: ThemeConfig };
  children: ReactNode;
};

export const ConfigProvider: FC<ConfigProviderProps> = ({
  children,
  value,
}) => {
  const { pageOpts, pageProps, themeConfig } = value;

  const config = useObservable<Config>({
    pageOpts,
    pageProps,
    themeConfig: mergeThemeConfig(themeConfig),
  });

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
