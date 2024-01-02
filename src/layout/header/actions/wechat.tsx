import { IconBrandWechat } from '@tabler/icons-react';

import { useLocale } from '../../../contents';
import { Action } from './action';
import classes from './wechat.module.css';

interface WechatActionProps {
  link: string;
}

export function WechatAction({ link }: WechatActionProps) {
  const locale = useLocale();

  return (
    <Action
      tooltip={locale.wechat}
      component="a"
      href={link}
      className={classes.wechat}>
      <IconBrandWechat size={22} />
    </Action>
  );
}
