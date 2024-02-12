import { observer } from '@legendapp/state/react';
import {
  ActionIcon,
  Anchor,
  Box,
  Group,
  rem,
  Stack,
  Text,
} from '@mantine/core';
import { IconList } from '@tabler/icons-react';

import { BackToTop } from '../../components';
import { layoutStore, useLocale, useStore } from '../../contents';
import { getGitIssueUrl } from '../../utils/get-git-issue-url';
import { useGitEditUrl } from '../../utils/use-git-edit-url';
import classes from '../index.module.css';
import { Toc } from './toc/toc';

const EditLink = () => {
  const store = useStore();
  const locales = useLocale();

  const editUrl = useGitEditUrl(store.pageOpts.filePath.get());
  if (!editUrl) {
    return null;
  }

  return (
    <Anchor size="xs" href={editUrl} underline="never">
      {locales.editPage}
    </Anchor>
  );
};

const FeedbackLink = observer(() => {
  const locales = useLocale();
  const store = useStore();
  const docsRepositoryBase = store.themeConfig.docsRepositoryBase.get();

  const url = getGitIssueUrl({
    labels: locales.feedback,
    repository: docsRepositoryBase,
    title: `Feedback for ${store.pageOpts.title.get()}`,
  });

  return (
    <Anchor size="xs" href={url} underline="never">
      {locales.feedbackMessage}
    </Anchor>
  );
});

export const Navbar = observer(() => {
  const store = useStore();
  const activeType = store.normalizePages.activeType.get();
  const activeThemeContext = store.normalizePages.activeThemeContext.get();
  const frontMatter = store.pageOpts.frontMatter.get();
  const themeContext = { ...activeThemeContext, ...frontMatter };
  const { backToTop, feedback, editPage } = store.themeConfig.toc.get();
  const tocOpened = layoutStore.tocOpened.get();
  const locales = useLocale();

  const toggle = () => layoutStore.tocOpened.set(!tocOpened);

  const hiddenNav =
    activeType === 'page' ||
    !themeContext.toc ||
    themeContext.layout !== 'default';

  if (!tocOpened && !hiddenNav) {
    return (
      <ActionIcon
        variant="transparent"
        onClick={toggle}
        className={classes.navbarIcon}>
        <IconList size={20} />
      </ActionIcon>
    );
  }

  return (
    <Box component="nav">
      <Box className={classes.navbar} hidden={hiddenNav}>
        <Group h={rem(48)}>
          <ActionIcon variant="transparent" onClick={toggle}>
            <IconList size={20} />
          </ActionIcon>
          <Text>{locales.tocTitle}</Text>
        </Group>
        <Toc />
        <Stack h={rem(128)} justify="center" gap="xs">
          {feedback && <FeedbackLink />}
          {editPage && <EditLink />}
        </Stack>
      </Box>
      {backToTop && <BackToTop />}
    </Box>
  );
});
