import { observer } from '@legendapp/state/react';
import { ThemeProvider as Provider } from 'next-themes';
import type { FC } from 'react';
import React from 'react';

import { store } from '@/store';

export type ThemeProviderProps = {
  children?: React.ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = observer(
  ({ children }) => {
    const nextThemes = store.themeConfig.nextThemes.get();
    return (
      <Provider
        attribute="class"
        disableTransitionOnChange
        defaultTheme={nextThemes.defaultTheme}
        storageKey={nextThemes.storageKey}
        forcedTheme={nextThemes.forcedTheme}>
        {children}
      </Provider>
    );
  },
);
