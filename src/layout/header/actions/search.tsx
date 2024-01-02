import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import cx from 'clsx';
import {
  BoxProps,
  ElementProps,
  Group,
  Kbd,
  rem,
  Text,
  UnstyledButton,
} from '@mantine/core';
import classes from './search.module.css';
import { useLocale } from '../../../contents';

interface SearchActionProps extends BoxProps, ElementProps<'button'> {}

export function SearchAction({ className, ...others }: SearchActionProps) {
  const locale = useLocale();
  return (
    <UnstyledButton {...others} className={cx(classes.root, className)}>
      <Group gap="xs">
        <IconSearch style={{ width: rem(15), height: rem(15) }} stroke={1.5} />
        <Text fz="sm" c="dimmed" pr={40}>
          {locale.search}
        </Text>

        <Kbd fw={700} className={classes.shortcut}>
          Ctrl + K
        </Kbd>
      </Group>
    </UnstyledButton>
  );
}
