import { IconBrandBilibili } from '@tabler/icons-react';
import { useLocale } from '../../../contents';
import { Action } from './action';
import classes from './bilibili.module.css';

interface DiscordControlProps {
  link: string;
}

export function BilibiliAction({ link }: DiscordControlProps) {
  const locales = useLocale();

  return (
    <Action
      tooltip={locales.bilibili}
      component="a"
      href={link}
      className={classes.bilibili}>
      <IconBrandBilibili size={20} />
    </Action>
  );
}
