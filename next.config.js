const withNextra = require('nextra')({
  theme: './src',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  latex: true,
  staticImage: true,
  codeHighlight: true,
  readingTime: true,
  // flexsearch: {
  //   codeblocks: false,
  // },
});

module.exports = withNextra({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['zh-CN'],
    defaultLocale: 'zh-CN',
  },
});
