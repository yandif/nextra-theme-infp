import { isFunction } from 'lodash';
import type { NextSeoProps } from 'next-seo';
import type { FC, ReactNode } from 'react';
import { isValidElement } from 'react';
import { z } from 'zod';

import { themeOptionsSchema } from '@/theme/components/theme-switch';
import type { TOCProps } from '@/theme/components/toc';

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
  { message: 'Must be React.ReactNode or React.FC' },
] as const;

const fc = [isFunction, { message: 'Must be React.FC' }] as const;

const i18nSchema = z.array(
  z.strictObject({
    direction: z.enum(['ltr', 'rtl']).optional(),
    locale: z.string(),
    text: z.string(),
  }),
);

export const themeSchema = z.strictObject({
  nextThemes: z.strictObject({
    defaultTheme: z.string(),
    forcedTheme: z.string().optional(),
    storageKey: z.string(),
  }),
  themeSwitch: z.strictObject({
    component: z.custom<ReactNode | FC<{ lite?: boolean; className?: string }>>(
      ...reactNode,
    ),
    useOptions: themeOptionsSchema.or(z.function().returns(themeOptionsSchema)),
  }),
  title: z.string().optional(),
  faviconGlyph: z.string().optional(),
  useNextSeoProps: z.custom<() => NextSeoProps | void>(isFunction),
  head: z.custom<ReactNode | FC>(...reactNode),
  banner: z.strictObject({
    dismissible: z.boolean(),
    key: z.string(),
    text: z.custom<ReactNode | FC>(...reactNode).optional(),
  }),
  header: z.strictObject({
    logo: z.custom<ReactNode | FC>(...reactNode),
    logoLink: z.boolean().or(z.string()),
  }),
  components: z.record(z.custom<FC>(...fc)).optional(),
  toc: z.strictObject({
    /** 是否显示回到顶部按钮 */
    backToTop: z.boolean(),
    component: z.custom<ReactNode | FC<TOCProps>>(...reactNode),
    extraContent: z.custom<ReactNode | FC>(...reactNode),
    float: z.boolean(),
    headingComponent: z
      .custom<FC<{ id: string; children: string }>>(...fc)
      .optional(),
    title: z.custom<ReactNode | FC>(...reactNode),
  }),
  feedback: z.strictObject({
    content: z.custom<ReactNode | FC>(...reactNode),
    labels: z.string(),
    useLink: z.function().returns(z.string()),
  }),
  docsRepositoryBase: z.string().startsWith('https://'),
  editLink: z.strictObject({
    component: z.custom<
      FC<{
        children: ReactNode;
        className?: string;
        filePath?: string;
      }>
    >(...fc),
    text: z.custom<ReactNode | FC>(...reactNode),
  }),
});

const publicThemeSchema = themeSchema.deepPartial().extend({
  i18n: i18nSchema.optional(),
});

export type ThemeConfig = z.infer<typeof themeSchema>;
export type PartialThemeConfig = z.infer<typeof publicThemeSchema>;