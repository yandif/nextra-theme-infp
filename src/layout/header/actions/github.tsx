import { IconBrandGithub } from '@tabler/icons-react';

import { useLocale } from '../../../contents';
import { Action } from './action';
import classes from './github.module.css';

interface GithubActionProps {
  link: string;
}

export function GithubAction({ link }: GithubActionProps) {
  const locale = useLocale();
  return (
    <Action
      tooltip={locale.github}
      component="a"
      href={link}
      className={classes.github}>
      <IconBrandGithub size={22} />
    </Action>
  );
}
