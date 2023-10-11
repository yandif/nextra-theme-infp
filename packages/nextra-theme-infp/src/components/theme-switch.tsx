import { useTheme } from 'next-themes';
import { useMounted } from 'nextra/hooks';
import type { ReactElement } from 'react';
import React from 'react';
import { z } from 'zod';

import { store } from '@/store';

import { MoonIcon, SunIcon, SystemIcon } from './icon';
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

const iconMap = {
  light: SunIcon,
  dark: MoonIcon,
  system: SystemIcon,
};

const changeMap = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

export function ThemeSwitch({
  lite,
  className,
}: ThemeSwitchProps): ReactElement {
  const { setTheme, theme = '' } = useTheme();
  const mounted = useMounted();
  const config = store.themeSchema.themeSwitch.get();

  const IconToUse = mounted ? iconMap[theme as keyof typeof iconMap] : SunIcon;
  const options: ThemeOptions =
    typeof config.useOptions === 'function'
      ? config.useOptions()
      : config.useOptions;

  if (lite) {
    const handleClick = () => {
      setTheme(changeMap[theme as keyof typeof changeMap]);
    };

    return (
      <Select>
        <SelectTrigger
          className="min-w-[36px] w-[36px] p-0 flex items-center justify-center"
          title="Change theme"
          onClick={handleClick}
          hideIcon
          hideRing
          data-placeholder>
          <IconToUse />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger
        className={className}
        title="Change theme"
        hideIcon
        hideRing
        data-placeholder>
        <IconToUse />
        {mounted ? <SelectValue placeholder="Theme" /> : options.light}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">{options.light}</SelectItem>
        <SelectItem value="dark">{options.dark}</SelectItem>
        <SelectItem value="system">{options.system}</SelectItem>
      </SelectContent>
    </Select>
  );
}
