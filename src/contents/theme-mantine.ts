import { observable } from '@legendapp/state';
import { useSelector } from '@legendapp/state/react';
import {
  DEFAULT_THEME,
  MantineTheme,
  MantineThemeOverride,
  mergeMantineTheme,
} from '@mantine/core';

const defaultTheme: MantineThemeOverride = {
  /* Put your mantine theme override here */
  primaryColor: 'blue',
  colors: {
    tomato: [
      '#fff0e4',
      '#ffe0cf',
      '#fac0a1',
      '#f69e6e',
      '#f28043',
      '#f06d27',
      '#f06418',
      '#d6530c',
      '#bf4906',
      '#a73c00',
    ],
    sky: [
      '#e1f9ff',
      '#ccedff',
      '#9ad7ff',
      '#64c1ff',
      '#3baefe',
      '#20a2fe',
      '#099cff',
      '#0088e4',
      '#0078cd',
      '#0069b6',
    ],
    infp: [
      '#e6fcf5',
      '#d8f5e8',
      '#b3e7d1',
      '#8bdab8',
      '#69cea3',
      '#54c796',
      '#46c58e',
      '#36ad7a',
      '#2a9a6c',
      '#15855b',
    ],
  },
};

export const mantineTheme = observable<MantineThemeOverride>(
  mergeMantineTheme(DEFAULT_THEME, defaultTheme),
);

export const useMantineTheme = () => {
  return useSelector(() => mantineTheme.get());
};

export const setMantineTheme = (theme: MantineThemeOverride) => {
  mantineTheme.set(
    mergeMantineTheme(mantineTheme.get() as MantineTheme, theme),
  );
};
