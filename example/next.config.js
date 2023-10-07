/* eslint-disable @typescript-eslint/no-var-requires */

const withNextra = require('nextra')({
  theme: 'nextra-theme-infp',
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra({
  i18n: {
    locales: ['zh-CN'],
    defaultLocale: 'zh-CN',
  },
});
