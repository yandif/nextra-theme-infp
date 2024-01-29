import { observer } from '@legendapp/state/react';
import { Group } from '@mantine/core';
import { spotlight } from '@mantine/spotlight';

import { useStore } from '../../../contents';
import classes from '../../index.module.css';
import { BilibiliAction } from './bilibili';
import { DiscordAction } from './discord';
import { GithubAction } from './github';
import { RssAction } from './rss';
import { SearchAction } from './search';
import { SearchMobileAction } from './search-mobile';
import { ThemeSwitchAction } from './theme-switch';
import { ToggleTheme } from './toggle-theme';
import { TwitterAction } from './twitter';
import { WechatAction } from './wechat';

export const Actions = observer(() => {
  const {
    search,
    mobileSearch,
    themeSwitch,
    bilibili,
    wechat,
    twitter,
    discord,
    rss,
    github,
    toggleTheme,
  } = useStore().themeConfig.headerActions.get();

  return (
    <>
      <Group gap="xs" className={classes.desktop} wrap="nowrap">
        {search && <SearchAction onClick={spotlight.open} />}

        {bilibili && <BilibiliAction link={bilibili} />}
        {wechat && <WechatAction link={wechat} />}
        {twitter && <TwitterAction link={twitter} />}
        {discord && <DiscordAction link={discord} />}
        {rss && <RssAction link={rss} />}
        {github && <GithubAction link={github} />}
        {toggleTheme && <ToggleTheme />}
        {themeSwitch && <ThemeSwitchAction />}
      </Group>
      <Group gap="xs" className={classes.mobile} wrap="nowrap">
        {mobileSearch && <SearchMobileAction onClick={spotlight.open} />}
        {themeSwitch && <ThemeSwitchAction />}
      </Group>
    </>
  );
});
