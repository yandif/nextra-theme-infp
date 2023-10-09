/* eslint-disable @typescript-eslint/no-var-requires */

const withNextra = require('nextra')({
  theme: './src/index.ts',
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra({
  i18n: {
    locales: ['zh-CN'],
    defaultLocale: 'zh-CN',
  },
});
