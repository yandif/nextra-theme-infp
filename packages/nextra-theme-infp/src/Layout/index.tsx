import { observer } from '@legendapp/state/react';
import type { NextraThemeLayoutProps } from 'nextra';
import type { FC } from 'react';
import React, { useEffect } from 'react';

import { BackToTop } from '@/components/back-to-top';

import { Banner } from './banner';
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
      <Banner />
      <Header />
      <div className="h-[1500px] px-80">{children}</div>
      <BackToTop />
    </ThemeProvider>
  );
};

export default observer(Layout);
