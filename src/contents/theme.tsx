import { InfpLogo } from '../layout/header/logo/logo';
import { enUS, zhCN } from './locales';
import { DefaultThemeConfig } from './theme-schema';

export const defaultThemeConfig: DefaultThemeConfig = {
  banner: {
    dismissible: true,
    key: 'infp-theme-banner',
  },
  headerActions: {
    search: true,
    mobileSearch: true,
    themeSwitch: true,
  },
  locales: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  logo: <InfpLogo />,
  logoLink: true,
  navigation: true,
};
