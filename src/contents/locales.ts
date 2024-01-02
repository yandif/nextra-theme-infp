import z from 'zod';

export const locale = z.object({
  bilibili: z.string(),
  github: z.string(),
  RTLDirection: z.string(),
  LTRDirection: z.string(),
  discord: z.string(),
  RSS: z.string(),
  twitter: z.string(),
  wechat: z.string(),
  search: z.string(),
  darkMode: z.string(),
  lightMode: z.string(),
});

export type Locale = z.infer<typeof locale>;

export const zhCN: Locale = {
  bilibili: '哔哩哔哩',
  github: 'Github',
  RTLDirection: 'RTL 方向',
  LTRDirection: 'LTR 方向',
  discord: 'Discord',
  RSS: 'RSS 订阅',
  twitter: '推特',
  wechat: '微信',
  search: '搜索',
  darkMode: '深色模式',
  lightMode: '浅色模式',
};

export const enUS: Locale = {
  bilibili: 'Bilibili',
  github: 'Github',
  RTLDirection: 'RTL direction',
  LTRDirection: 'LTR direction',
  discord: 'Discord',
  RSS: 'RSS',
  twitter: 'Twitter',
  wechat: 'WeChat',
  search: 'Search',
  darkMode: 'Dark Mode',
  lightMode: 'Light Mode',
};

const merge =
  (_locale: Locale) =>
  (locale: Partial<Locale>): Locale => {
    return { ..._locale, ...locale };
  };
export const mergeZhCN = merge(zhCN);
export const mergeEnUS = merge(enUS);
