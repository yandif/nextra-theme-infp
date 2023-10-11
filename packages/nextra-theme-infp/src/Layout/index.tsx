import { observer } from '@legendapp/state/react';
import type { NextraThemeLayoutProps } from 'nextra';
import type { FC } from 'react';
import React, { useEffect } from 'react';

import { ThemeSwitch } from '@/components/theme-switch';

import { BackToTop } from '..';
import { Header } from './header';
import { ThemeProvider } from './theme-provider';

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  useEffect(() => {
    console.log(context);
  }, []);

  // 2. 验证主题配置，是否符合模版
  // 3. 存储到状态中

  return (
    <ThemeProvider>
      <Header />
      <div className="h-[1500px]">{children}</div>
      <div className="w-[160px]">
        <ThemeSwitch /> <br />
        <ThemeSwitch lite />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
};

export default observer(Layout);
