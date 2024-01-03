import { observer } from '@legendapp/state/react';
import { Anchor, Box } from '@mantine/core';
import clsx from 'clsx';
import { isString } from 'lodash';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useStore } from '../../../contents';
import { renderComponent } from '../../../utils';
import classes from './logo.module.css';

export const InfpLogo = () => {
  const { locale } = useRouter();

  return (
    <>
      <span className={classes.logoTitle}>INFP</span>
      <span className={classes.logoDesc}>
        {locale === 'zh-CN' ? '一个 Nextra 主题' : ' A Nextra Theme'}
      </span>
    </>
  );
};

export const Logo = observer(() => {
  const store = useStore();
  const { logo, logoLink } = store.themeConfig.get();

  if (!logoLink) {
    return <Box className={classes.root}>{renderComponent(logo)}</Box>;
  }

  return (
    <Anchor
      className={clsx(classes.root, classes.link)}
      component={NextLink}
      href={isString(logoLink) ? logoLink : '/'}
      underline="never">
      {renderComponent(logo)}
    </Anchor>
  );
});
