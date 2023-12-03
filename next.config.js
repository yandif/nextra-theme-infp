const withNextra = require('nextra')({
  theme: './theme',
  // theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  codeHighlight: true,
  latex: true,
  flexsearch: {
    codeblocks: false,
  },
});

module.exports = withNextra({
  i18n: {
    locales: ['zh-CN'],
    defaultLocale: 'zh-CN',
  },
});
