import type { ObservableObject } from '@legendapp/state';
import { observable } from '@legendapp/state';
import { useObservable } from '@legendapp/state/react';
import { useRouter } from 'next/router';
import type { PageOpts } from 'nextra';
import { useFSRoute } from 'nextra/hooks';
import { normalizePages } from 'nextra/normalize-pages';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo } from 'react';

import { defaultThemeConfig, mergeThemeConfig } from './theme';
import type { ThemeConfig } from './theme-schema';

type Store = {
  themeConfig: ThemeConfig;
  pageOpts: PageOpts;
  pageProps: any;
  normalizePages: ReturnType<typeof normalizePages>;
  menu: boolean;
};

const StoreContext = createContext<ObservableObject<Store>>(
  observable({
    themeConfig: defaultThemeConfig,
    pageOpts: {} as PageOpts,
    pageProps: {},
    normalizePages: {} as ReturnType<typeof normalizePages>,
    menu: false,
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
  const { pageMap } = pageOpts;
  const { locale = 'zh-CN', defaultLocale } = useRouter();
  const fsPath = useFSRoute();

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

  const initialValue = {
    themeConfig: mergeThemeConfig(themeConfig),
    normalizePages: _normalizePages,
    pageOpts,
    pageProps,
    menu: false,
  };

  const store = useObservable<Store>(initialValue);

  // 由于 useObservable 只初始化一次，所以需要在每次路由变化的时候重新赋值
  useEffect(() => {
    store.set(initialValue);
  }, [fsPath]);

  // TODO：校验主题配置是是否合法。

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
