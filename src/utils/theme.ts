import { isValidElement } from 'react';

import { defaultThemeConfig } from '../contents/theme';
import { DefaultThemeConfig, ThemeConfig } from '../contents/theme-schema';

/**
 * 合并主题配置
 */
export const mergeThemeConfig = (
  themeConfig: ThemeConfig,
): DefaultThemeConfig => {
  const deepKeys = Object.entries(defaultThemeConfig)
    .map(([key, value]) => {
      const isObject =
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !isValidElement(value);
      if (isObject) {
        return key;
      }
    })
    .filter(Boolean);

  return {
    ...defaultThemeConfig,
    ...Object.fromEntries(
      Object.entries(themeConfig).map(([key, value]) => [
        key,
        value && typeof value === 'object' && deepKeys.includes(key)
          ? {
              ...(defaultThemeConfig[key as keyof DefaultThemeConfig] as {}),
              ...value,
            }
          : value,
      ]),
    ),
  };
};
