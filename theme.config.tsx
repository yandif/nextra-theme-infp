import type { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  banner: {
    dismissible: true,
    key: 'infp-banner',
    text: '这是一个Banner1111！',
  },
  logo: () => <h1 style={{ fontSize: 20, color: '#228BE6' }}>札记</h1>,
};

export default config;
