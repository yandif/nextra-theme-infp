import { observer } from '@legendapp/state/react';
import { Button, Group } from '@mantine/core';

import { mantineTheme, setMantineTheme, useStore } from '../../../contents';
import classes from '../../index.module.css';
import { BilibiliAction } from './bilibili';
import { DiscordAction } from './discord';
import { GithubAction } from './github';
import { RssAction } from './rss';
import { SearchAction } from './search';
import { SearchMobileAction } from './search-mobile';
import { ThemeSwitchAction } from './theme-switch';
import { TwitterAction } from './twitter';
import { WechatAction } from './wechat';
let i = 0;
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
  } = useStore().themeConfig.headerActions.get();

  return (
    <>
      <Group gap="xs" className={classes.desktop} wrap="nowrap">
        <Button
          onClick={() => {
            i++;
            const arr = [
              'infp',
              'tomato',
              'sky',
              'dark',
              'gray',
              'red',
              'pink',
              'grape',
              'violet',
              'indigo',
              'blue',
              'cyan',
              'green',
              'lime',
              'yellow',
              'orange',
              'teal',
            ];

            setMantineTheme({
              primaryColor: arr[(i % arr.length) - 1] || 'blue',
            });
          }}>
          切换主题
        </Button>
        {search && <SearchAction />}
        {bilibili && <BilibiliAction link={bilibili} />}
        {wechat && <WechatAction link={wechat} />}
        {twitter && <TwitterAction link={twitter} />}
        {discord && <DiscordAction link={discord} />}
        {rss && <RssAction link={rss} />}
        {github && <GithubAction link={github} />}
        {themeSwitch && <ThemeSwitchAction />}
      </Group>

      <Group gap="xs" className={classes.mobile} wrap="nowrap">
        {mobileSearch && <SearchMobileAction />}
        {themeSwitch && <ThemeSwitchAction />}
      </Group>
    </>
  );
});
