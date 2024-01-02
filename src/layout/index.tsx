import { DirectionProvider, MantineProvider } from '@mantine/core';
import { NextraThemeLayoutProps } from 'nextra';
import { FC } from 'react';

import { theme } from '../../theme';
import { StoreProvider } from '../contents';
import { Banner } from './banner/banner';
import { Head } from './head/head';
import { Header } from './header/header';
import classes from './index.module.css';

const Layout: FC<NextraThemeLayoutProps> = ({ children, ...context }) => {
  return (
    <DirectionProvider>
      <MantineProvider theme={theme}>
        <StoreProvider value={context}>
          <div className={classes.root}>
            <Head />
            <Banner />
            <Header />
            <div className={classes.main}>
              <div className={classes.aside}>aside</div>
              <div className={classes.content}>content</div>
              <div className={classes.nav}>nav</div>
            </div>
            <div className={classes.footer}>footer</div>
          </div>
        </StoreProvider>
      </MantineProvider>
    </DirectionProvider>
  );
};

export default Layout;
