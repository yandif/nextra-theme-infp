import { useRouter } from 'next/router';
import React from 'react';

import { ThemeSwitch } from '@/components/theme-switch';

import type { ThemeSchema } from './theme-schema';

export const DefaultThemeSchema: ThemeSchema = {
  nextThemes: {
    defaultTheme: 'system',
    storageKey: 'theme',
  },
  themeSwitch: {
    component: ThemeSwitch,
    useOptions() {
      const { locale } = useRouter();

      if (locale === 'zh-CN') {
        return { dark: '深色主题', light: '浅色主题', system: '系统默认' };
      }
      return { dark: 'Dark', light: 'Light', system: 'System' };
    },
  },
  header: {
    logo: (
      <>
        <span className="text-primary font-extrabold">INFP</span>
        <span className="ml-2 hidden text-xs font-normal text-gray-600 dark:text-gray-400 md:inline">
          a nextra theme
        </span>
      </>
    ),
    logoLink: true,
  },
};
