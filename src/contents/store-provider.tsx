import type { ObservableObject } from '@legendapp/state';
import { observable } from '@legendapp/state';
import { useObservable, useSelector } from '@legendapp/state/react';
import { useRouter } from 'next/router';
import type { NextraThemeLayoutProps, PageOpts } from 'nextra';
import { normalizePages } from 'nextra/normalize-pages';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo } from 'react';

import { mergeThemeConfig } from '../utils';
import { defaultThemeConfig } from './theme';
import type { DefaultThemeConfig } from './theme-schema';

type NormalizePages = ReturnType<typeof normalizePages>;

type Store = {
  /** 主题配置 */
  themeConfig: DefaultThemeConfig;
  /** 页面选项 */
  pageOpts: PageOpts;
  /** _app 页面所传的 pageProps */
  pageProps: any;
  /**  处理后的页面配置信息 */
  normalizePages: NormalizePages;
};

const StoreContext = createContext<ObservableObject<Store>>(
  observable({
    themeConfig: defaultThemeConfig,
    pageOpts: {} as PageOpts,
    pageProps: {},
    normalizePages: {} as NormalizePages,
  }),
);

/**
 *  获取主题全局上下文
 */
export const useStore = () => useContext(StoreContext);

/**
 *  获取多语言
 */
export const useLocale = () => {
  const { locale, defaultLocale = 'zh-CN' } = useRouter();
  const store = useStore();
  const locales = useSelector(() =>
    store.themeConfig.locales[locale || defaultLocale].get(),
  );

  return locales;
};

/**
 * 主题全局上下文
 */
export const StoreProvider: FC<{
  value: Omit<NextraThemeLayoutProps, 'children'>;
  children: ReactNode;
}> = ({ children, value }) => {
  const { pageOpts, pageProps, themeConfig } = value;
  const { route, pageMap } = pageOpts;
  const { locale = 'zh-CN', defaultLocale = 'zh-CN' } = useRouter();

  const _normalizedPages = useMemo(() => {
    return normalizePages({
      list: pageMap,
      locale,
      defaultLocale,
      route,
    });
  }, [pageMap, locale, route, defaultLocale]);

  const initialValue = {
    themeConfig: mergeThemeConfig(themeConfig),
    pageOpts,
    pageProps,
    normalizePages: _normalizedPages,
  };

  const store = useObservable<Store>(initialValue);

  // 由于 useObservable 只初始化一次，所以需要在每次路由变化的时候重新赋值
  useEffect(() => {
    store.set(initialValue);
  }, [route]);

  // TODO：校验主题配置是是否合法。

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
