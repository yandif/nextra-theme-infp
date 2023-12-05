import gitUrlParse from 'git-url-parse';

import { useStore } from '../config/context';

export function useGitEditUrl(filePath = ''): string {
  const config = useStore().themeConfig.get();
  const repo = gitUrlParse(config.docsRepositoryBase || '');

  if (!repo) throw new Error('Invalid `docsRepositoryBase` URL!');

  return `${repo.href}/${filePath}`;
}
