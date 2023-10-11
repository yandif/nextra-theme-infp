import { useTheme } from 'next-themes';
import { useMounted } from 'nextra/hooks';
import { MoonIcon, SunIcon } from 'nextra/icons';
import type { ReactElement } from 'react';
import React from 'react';
import { z } from 'zod';

import { store } from '@/store';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type ThemeSwitchProps = {
  lite?: boolean;
  className?: string;
};

export const themeOptionsSchema = z.strictObject({
  light: z.string(),
  dark: z.string(),
  system: z.string(),
});

type ThemeOptions = z.infer<typeof themeOptionsSchema>;

export function ThemeSwitch({
  lite,
  className,
}: ThemeSwitchProps): ReactElement {
  const { setTheme, resolvedTheme, theme = '' } = useTheme();
  const mounted = useMounted();
  const config = store.themeSchema.themeSwitch.get();

  const IconToUse = mounted && resolvedTheme === 'dark' ? MoonIcon : SunIcon;
  const options: ThemeOptions =
    typeof config.useOptions === 'function'
      ? config.useOptions()
      : config.useOptions;

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger
        className={className}
        title="Change theme"
        hideIcon
        data-placeholder>
        <IconToUse />
        {mounted ? (
          <SelectValue className={lite ? 'hidden' : ''} placeholder="Theme" />
        ) : (
          options.light
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">{options.light}</SelectItem>
        <SelectItem value="dark">{options.dark}</SelectItem>
        <SelectItem value="system">{options.system}</SelectItem>
      </SelectContent>
    </Select>
  );
}
