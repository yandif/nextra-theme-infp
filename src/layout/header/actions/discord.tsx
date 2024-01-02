import { IconBrandDiscord } from '@tabler/icons-react';

import { useLocale } from '../../../contents';
import { Action } from './action';
import classes from './discord.module.css';

interface DiscordControlProps {
  link: string;
}

export function DiscordAction({ link }: DiscordControlProps) {
  const locale = useLocale();
  return (
    <Action
      tooltip={locale.discord}
      component="a"
      href={link}
      className={classes.discord}>
      <IconBrandDiscord size={20} />
    </Action>
  );
}
