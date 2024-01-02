import { rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Action } from './action';
import { useLocale } from '../../../contents';

interface SearchMobileActionProps {
  onClick?: () => void;
}

export function SearchMobileAction({ onClick }: SearchMobileActionProps) {
  const locale = useLocale();
  return (
    <Action onClick={onClick} tooltip={locale.search}>
      <IconSearch style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
    </Action>
  );
}
