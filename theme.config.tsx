import { mergeZhCN, ThemeConfig } from './src/';

const themeConfig: ThemeConfig = {
  faviconGlyph: '📖',
  head: () => <meta name="description" content="123" />,
  banner: { text: '测试横幅' },
  headerActions: {
    github: 'https://github.com/yandif',
    toggleTheme: true,
  },
};

export default themeConfig;
