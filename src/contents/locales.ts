import z from 'zod';

export const locale = z.object({
  bilibili: z.string(),
  github: z.string(),
  discord: z.string(),
  RSS: z.string(),
  twitter: z.string(),
  wechat: z.string(),
  search: z.string(),
  darkMode: z.string(),
  lightMode: z.string(),
  codeWrap: z.string(),
  copied: z.string(),
  copy: z.string(),
  lastUpdate: z.string(),
  tocTitle: z.string(),
  noData: z.string(),
  feedback: z.string(),
  feedbackMessage: z.string(),
  editPage: z.string(),
});

export type Locale = z.infer<typeof locale>;

export const zhCN: Locale = {
  bilibili: 'B站',
  github: 'Github',
  discord: 'Discord',
  RSS: 'RSS 订阅',
  twitter: '推特',
  wechat: '微信',
  search: '搜索',
  darkMode: '深色模式',
  lightMode: '浅色模式',
  codeWrap: '代码换行',
  copied: '复制成功',
  copy: '复制',
  lastUpdate: '最后更新于',
  tocTitle: '目录',
  noData: '无数据',
  feedback: '反馈',
  feedbackMessage: '有疑问？给我反馈 →',
  editPage: '编辑本页 →',
};

export const enUS: Locale = {
  bilibili: 'Bilibili',
  github: 'Github',
  discord: 'Discord',
  RSS: 'RSS',
  twitter: 'Twitter',
  wechat: 'WeChat',
  search: 'Search',
  darkMode: 'Dark Mode',
  lightMode: 'Light Mode',
  codeWrap: 'Code wrap',
  copied: 'Copied',
  copy: 'Copy',
  lastUpdate: 'Last update on',
  tocTitle: 'Table of Contents',
  noData: 'Nothing found',
  feedback: 'Feedback',
  feedbackMessage: 'Have questions? Give me feedback →',
  editPage: 'Edit this page →',
};

const merge =
  (_locale: Locale) =>
  (locale: Partial<Locale>): Locale => {
    return { ..._locale, ...locale };
  };
export const mergeZhCN = merge(zhCN);
export const mergeEnUS = merge(enUS);
