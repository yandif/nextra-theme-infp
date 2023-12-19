import { useTheme } from 'next-themes';
import { useMounted } from 'nextra/hooks';
import type { ReactElement } from 'react';
import { z } from 'zod';

import { useStore } from '@/theme/content/context';

import { GlobeIcon } from './icons/globe';
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

export function LocaleSwitch({
  lite = true,
  className,
}: ThemeSwitchProps): ReactElement {
  const { setTheme, theme = '' } = useTheme();
  const mounted = useMounted();
  const config = useStore().themeConfig.themeSwitch.get();

  const IconToUse = GlobeIcon;
  const options: ThemeOptions =
    typeof config.useOptions === 'function'
      ? config.useOptions()
      : config.useOptions;

  if (lite) {
    return (
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger
          className="min-w-[36px] w-[36px] p-0 flex items-center justify-center"
          title="Change theme"
          hideIcon
          hideRing
          data-placeholder>
          <IconToUse />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">{options.light}</SelectItem>
          <SelectItem value="dark">{options.dark}</SelectItem>
          <SelectItem value="system">{options.system}</SelectItem>
        </SelectContent>
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
