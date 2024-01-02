import { IconRss } from '@tabler/icons-react';
import { useLocale } from '../../../contents';
import { Action } from './action';
import classes from './rss.module.css';

interface RssActionProps {
  link: string;
}

export function RssAction({ link }: RssActionProps) {
  const locale = useLocale();

  return (
    <Action
      tooltip={locale.RSS}
      component="a"
      href={link}
      className={classes.rss}>
      <IconRss size={22} />
    </Action>
  );
}
