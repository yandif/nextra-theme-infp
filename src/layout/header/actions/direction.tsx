import { rem, useDirection } from '@mantine/core';
import {
  IconTextDirectionLtr,
  IconTextDirectionRtl,
} from '@tabler/icons-react';

import { layoutStore, useLocale } from '../../../contents';
import { Action } from './action';

export function DirectionAction() {
  const { setDirection, dir } = useDirection();
  const locales = useLocale();

  const toggleDirection = () => {
    const nextDir = dir === 'ltr' ? 'rtl' : 'ltr';
    layoutStore.direction.set(nextDir);
    setDirection(nextDir);
  };

  return (
    <Action
      onClick={() => toggleDirection()}
      tooltip={dir === 'ltr' ? locales.RTLDirection : locales.LTRDirection}>
      {dir === 'rtl' ? (
        <IconTextDirectionLtr
          style={{ width: rem(22), height: rem(22), pointerEvents: 'none' }}
          stroke={1.5}
        />
      ) : (
        <IconTextDirectionRtl
          style={{ width: rem(22), height: rem(22), pointerEvents: 'none' }}
          stroke={1.5}
        />
      )}
    </Action>
  );
}
