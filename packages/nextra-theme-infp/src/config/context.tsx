import type { ObservableObject } from '@legendapp/state';
import { observable } from '@legendapp/state';
import { useObservable } from '@legendapp/state/react';
import { useRouter } from 'next/router';
import type { PageOpts } from 'nextra';
import { useFSRoute } from 'nextra/hooks';
import { normalizePages } from 'nextra/normalize-pages';
import type { FC, ReactNode } from 'react';
import React, { createContext, useContext, useMemo } from 'react';

import { isBrowser } from '@/utils';

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
  const { locale = 'zh-CN', defaultLocale } = useRouter();
  const fsPath = useFSRoute();
  const { pageMap } = pageOpts;
  const {
    activeType,
    activeIndex,
    activeThemeContext,
    activePath,
    topLevelNavbarItems,
    docsDirectories,
    flatDirectories,
    flatDocsDirectories,
    directories,
  } = useMemo(
    () =>
      normalizePages({
        list: pageMap,
        locale,
        defaultLocale,
        route: fsPath,
      }),
    [pageMap, locale, defaultLocale, fsPath],
  );

  if (isBrowser) {
    console.log({
      activeType,
      activeIndex,
      activeThemeContext,
      activePath,
      topLevelNavbarItems,
      docsDirectories,
      flatDirectories,
      flatDocsDirectories,
      directories,
    });
  }

  const store = useObservable<Store>({
    pageOpts,
    pageProps,
    themeConfig: mergeThemeConfig(themeConfig),
  });

  // TODO：校验主题配置是是否合法。

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
