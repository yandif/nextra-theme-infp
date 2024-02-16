import { isFunction } from 'lodash';
import { FC, isValidElement, ReactNode } from 'react';
import { z } from 'zod';

import { GiscusProps } from '../utils/giscusProps';
import { locale } from './locales';

function isReactNode(value: unknown): boolean {
  return (
    value == null ||
    typeof value === 'string' ||
    isFunction(value) ||
    isValidElement(value as any)
  );
}

const reactNode = [
  isReactNode,
  { message: '必须是 React.ReactNode 或者 React.FC' },
] as const;

const fc = [isFunction, { message: '必须是 React.FC' }] as const;

const i18nSchema = z.array(
  z.strictObject({
    locale: z.string(),
    text: z.string(),
  }),
);

export const themeSchema = z.strictObject({
  docsRepositoryBase: z.string().startsWith('https://'),
  /** favicon 文字图形 */
  faviconGlyph: z.string().optional(),
  /** 自定义 head */
  head: z.custom<ReactNode | FC>(...reactNode),
  /** 顶部横幅 */
  banner: z.strictObject({
    dismissible: z.boolean(),
    key: z.string(),
    text: z.custom<ReactNode | FC>(...reactNode).optional(),
  }),
  /** 页面头部 Actions */
  headerActions: z.strictObject({
    search: z.boolean(),
    mobileSearch: z.boolean(),
    themeSwitch: z.boolean(),
    toggleTheme: z.boolean().optional(),
    direction: z.boolean().optional(),
    bilibili: z.string().startsWith('https://').optional(),
    twitter: z.string().startsWith('https://').optional(),
    github: z.string().startsWith('https://').optional(),
    wechat: z.string().startsWith('https://').optional(),
    rss: z.string().startsWith('https://').optional(),
    discord: z.string().startsWith('https://').optional(),
  }),
  logo: z.custom<ReactNode | FC>(...reactNode),
  logoLink: z.boolean().or(z.string()),
  locales: z.record(locale),
  components: z.record(z.custom<FC>(...fc)).optional(),
  navigation: z.boolean().or(
    z.strictObject({
      next: z.boolean(),
      prev: z.boolean(),
    }),
  ),
  toc: z.strictObject({
    backToTop: z.boolean(),
    feedback: z.boolean(),
    editPage: z.boolean(),
  }),
  /** 自定义 footer */
  footer: z.custom<ReactNode | FC>(...reactNode),
});

const partialThemeSchema = themeSchema.deepPartial().extend({
  i18n: i18nSchema.optional(),
});

export type DefaultThemeConfig = z.infer<typeof themeSchema> & {
  giscusProps?: GiscusProps;
};
export type ThemeConfig = z.infer<typeof partialThemeSchema> & {
  giscusProps?: GiscusProps;
};
