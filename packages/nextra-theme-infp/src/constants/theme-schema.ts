import { isFunction } from 'lodash';
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
});

export type ThemeSchema = z.infer<typeof themeSchema>;