import type { ObservableObject } from '@legendapp/state';
import { observable } from '@legendapp/state';
import { useObservable } from '@legendapp/state/react';
import { useRouter } from 'next/router';
import type { PageOpts } from 'nextra';
import { useFSRoute } from 'nextra/hooks';
import { normalizePages } from 'nextra/normalize-pages';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import { isBrowser } from '@/theme/utils';

import { defaultThemeConfig, mergeThemeConfig } from './theme';
import type { ThemeConfig } from './theme-schema';

type Store = {
  themeConfig: ThemeConfig;
  pageOpts: PageOpts;
  pageProps: any;
  normalizePages: ReturnType<typeof normalizePages>;
};

const StoreContext = createContext<ObservableObject<Store>>(
  observable({
    themeConfig: defaultThemeConfig,
    pageOpts: {} as PageOpts,
    pageProps: {},
    normalizePages: {} as ReturnType<typeof normalizePages>,
  }),
);

/**
 *  获取主题全局上下文
 */
export const useStore = () => useContext(StoreContext);

/**
 * 主题全局上下文
 */
export const StoreProvider: FC<{
  value: { pageOpts: PageOpts; pageProps: any; themeConfig: ThemeConfig };
  children: ReactNode;
}> = ({ children, value }) => {
  const { pageOpts, pageProps, themeConfig } = value;
  const { locale = 'zh-CN', defaultLocale } = useRouter();
  const fsPath = useFSRoute();
  const { pageMap } = pageOpts;
  const _normalizePages = useMemo(
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
    console.log(_normalizePages);
  }

  const store = useObservable<Store>({
    pageOpts,
    pageProps,
    themeConfig: mergeThemeConfig(themeConfig),
    normalizePages: _normalizePages,
  });

  // TODO：校验主题配置是是否合法。

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
