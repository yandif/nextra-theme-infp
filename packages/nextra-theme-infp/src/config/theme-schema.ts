import { isFunction } from 'lodash';
import type { NextSeoProps } from 'next-seo';
import { type FC, isValidElement, type ReactNode } from 'react';
import { z } from 'zod';

import { themeOptionsSchema } from '@/components/theme-switch';

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
});

const publicThemeSchema = themeSchema.deepPartial().extend({
  i18n: i18nSchema.optional(),
});

export type ThemeConfig = z.infer<typeof themeSchema>;
export type PartialThemeConfig = z.infer<typeof publicThemeSchema>;
