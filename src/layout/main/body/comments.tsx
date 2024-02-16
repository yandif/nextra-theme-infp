import Giscus from '@giscus/react';
import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { useComputedColorScheme } from '@mantine/core';
import { useRouter } from 'next/router';

import { useStore } from '../../../contents';

export const Comments = observer(() => {
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const { locale = 'zh-CN', route } = useRouter();
  const store = useStore();
  const { giscusProps } = store.themeConfig.get();
  const activeType = store.normalizePages.activeType.get();
  const activeThemeContext = store.normalizePages.activeThemeContext.get();
  const frontMatter = store.pageOpts.frontMatter.get() as {
    comments?: boolean;
    showComments?: boolean;
  };
  const themeContext = { ...activeThemeContext, ...frontMatter };
  const { comments = true, showComments = false } = themeContext;
  const hiddenComments =
    !showComments &&
    (activeType === 'page' || !comments || themeContext.layout !== 'default');

  return (
    !hiddenComments &&
    giscusProps && (
      <Giscus
        loading="eager"
        {...giscusProps}
        theme={
          computedColorScheme === 'dark' ? 'noborder_dark' : 'noborder_light'
        }
        lang={locale}
        key={route}
      />
    )
  );
});
