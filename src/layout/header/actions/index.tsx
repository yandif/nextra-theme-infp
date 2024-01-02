import { observer } from '@legendapp/state/react';
import { Group } from '@mantine/core';

import { useStore } from '../../../contents';
import classes from '../../index.module.css';
import { BilibiliAction } from './bilibili';
import { DirectionAction } from './direction';
import { DiscordAction } from './discord';
import { GithubAction } from './github';
import { RssAction } from './rss';
import { SearchAction } from './search';
import { SearchMobileAction } from './search-mobile';
import { ThemeSwitchAction } from './theme-switch';
import { TwitterAction } from './twitter';
import { WechatAction } from './wechat';

export const Actions = observer(() => {
  const {
    search,
    mobileSearch,
    themeSwitch,
    direction,
    bilibili,
    wechat,
    twitter,
    discord,
    rss,
    github,
  } = useStore().themeConfig.headerActions.get();

  return (
    <>
      <Group gap="xs" className={classes.desktop} wrap="nowrap">
        {search && <SearchAction />}
        {bilibili && <BilibiliAction link={bilibili} />}
        {wechat && <WechatAction link={wechat} />}
        {twitter && <TwitterAction link={twitter} />}
        {discord && <DiscordAction link={discord} />}
        {rss && <RssAction link={rss} />}
        {github && <GithubAction link={github} />}
        {direction && <DirectionAction />}
        {themeSwitch && <ThemeSwitchAction />}
      </Group>

      <Group gap="xs" className={classes.mobile} wrap="nowrap">
        {mobileSearch && <SearchMobileAction />}
        {themeSwitch && <ThemeSwitchAction />}
      </Group>
    </>
  );
});
