import { IconBrandX } from '@tabler/icons-react';
import { useLocale } from '../../../contents';
import { Action } from './action';
import classes from './twitter.module.css';

interface TwitterActionProps {
  link: string;
}

export function TwitterAction({ link }: TwitterActionProps) {
  const locale = useLocale();

  return (
    <Action
      tooltip={locale.twitter}
      component="a"
      href={link}
      className={classes.twitter}>
      <IconBrandX size={22} />
    </Action>
  );
}
