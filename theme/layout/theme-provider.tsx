import { observer } from '@legendapp/state/react';
import { ThemeProvider as Provider } from 'next-themes';
import type { FC, ReactNode } from 'react';

import { useStore } from '@/theme/config/context';

export type ThemeProviderProps = {
  children?: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = observer(
  ({ children }) => {
    const nextThemes = useStore().themeConfig.nextThemes.get();
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
