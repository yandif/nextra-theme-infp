import { useRouter } from 'next/router';

import { ThemeSwitch } from '@/components/theme-switch';

export const DefaultThemeSchema = {
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
};
