import { mergeZhCN, ThemeConfig } from './src/';

const themeConfig: ThemeConfig = {
  faviconGlyph: '📖',
  head: () => <meta name="description" content="123" />,
  banner: { text: '测试横幅' },
  headerActions: {
    github: 'https://github.com/yandif',
    toggleTheme: true,
  },
  giscusProps: {
    repo: 'yandif/nextra-theme-infp',
    repoId: 'R_kgDOKdG1og',
    category: 'Announcements',
    categoryId: 'DIC_kwDOKdG1os4CdQ3k',
    mapping: 'pathname',
    strict: '0',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
  },
};

export default themeConfig;
