import type { NextraThemeLayoutProps } from 'nextra';
import React from 'react';

import Layout from './layout';
import { context } from './utils/data';

const App = () => {
  return <Layout {...(context as any as NextraThemeLayoutProps)}>123</Layout>;
};
export default App;
