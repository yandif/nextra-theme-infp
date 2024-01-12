import { MantineProvider } from '@mantine/core';
import { NextraThemeLayoutProps } from 'nextra';
import { FC } from 'react';

import { StoreProvider, useMantineTheme } from '../contents';
import { Banner } from './banner/banner';
import { Head } from './head/head';
import { Header } from './header/header';
import classes from './index.module.css';
import { Main } from './main/main';

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  const theme = useMantineTheme();

  return (
    <MantineProvider theme={theme}>
      <StoreProvider value={context}>
        <div className={classes.root}>
          <Head />
          <Banner />
          <Header />
          <Main>{children}</Main>
          <div className={classes.footer}>footer</div>
        </div>
      </StoreProvider>
    </MantineProvider>
  );
};

export default Layout;
