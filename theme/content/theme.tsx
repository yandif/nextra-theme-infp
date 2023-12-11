import { useRouter } from 'next/router';
import { isValidElement } from 'react';

import { Anchor } from '../components/anchor';
import { TOC } from '../components/toc';
import { getGitIssueUrl } from '../utils/get-git-issue-url';
import { useGitEditUrl } from '../utils/use-git-edit-url';
import { useStore } from './context';
import type { ThemeConfig } from './theme-schema';

/**
 * 主题默认配置
 */
export const defaultThemeConfig: ThemeConfig = {
  nextThemes: {
    defaultTheme: 'system',
    storageKey: 'theme',
  },
  themeSwitch: {
    useOptions() {
      const { locale } = useRouter();

      if (locale === 'zh-CN') {
        return { dark: '深色主题', light: '浅色主题', system: '系统默认' };
      }
      return { dark: 'Dark', light: 'Light', system: 'System' };
    },
  },
  useNextSeoProps: () => ({ titleTemplate: '%s – Nextra' }),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#fff" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="INFP: a nextra theme" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shuding_" />
      <meta property="og:title" content="INFP: a nextra theme" />
      <meta property="og:description" content="INFP: a nextra theme" />
      <meta name="apple-mobile-web-app-title" content="INFP" />
    </>
  ),
  banner: {
    dismissible: true,
    key: 'infp-banner',
    text: '这是一个Banner！',
  },
  header: {
    logo: (
      <>
        <span className="text-primary font-extrabold">INFP</span>
        <span className="ml-2 hidden text-xs font-normal text-gray-600 dark:text-gray-400 md:inline">
          a nextra theme
        </span>
      </>
    ),
    logoLink: true,
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra',
  toc: {
    backToTop: true,
    component: (props) => <TOC {...props} />,
    float: true,
    title: '目录',
    extraContent: <>extraContent</>,
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
    useLink() {
      const config = useStore().themeConfig.get();
      return getGitIssueUrl({
        labels: config.feedback.labels,
        repository: config.docsRepositoryBase,
        title: `Feedback for “${config.title}”`,
      });
    },
  },
  editLink: {
    component: function EditLink({ className, filePath, children }) {
      const editUrl = useGitEditUrl(filePath);
      if (!editUrl) {
        return null;
      }
      return (
        <Anchor className={className} href={editUrl}>
          {children}
        </Anchor>
      );
    },
    text: 'Edit this page',
  },
  components: {},
};

/**
 * 合并主题配置
 */
export const mergeThemeConfig = (themeConfig: any) => {
  const deepKeys = Object.entries(defaultThemeConfig)
    .map(([key, value]) => {
      const isObject =
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !isValidElement(value);
      if (isObject) {
        return key;
      }
    })
    .filter(Boolean);

  return {
    ...defaultThemeConfig,
    ...Object.fromEntries(
      Object.entries(themeConfig).map(([key, value]) => [
        key,
        value && typeof value === 'object' && deepKeys.includes(key)
          ? {
              ...(defaultThemeConfig[key as keyof ThemeConfig] as {}),
              ...value,
            }
          : value,
      ]),
    ),
  };
};
