import {
  BoxProps,
  createPolymorphicComponent,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import classes from './action.module.css';

export interface ActionProps extends BoxProps {
  tooltip: string;
  'aria-label'?: string;
  children: ReactNode;
}

function _Action({
  tooltip,
  className,
  'aria-label': label,
  ...others
}: ActionProps) {
  return (
    <Tooltip label={tooltip}>
      <UnstyledButton
        className={clsx(classes.root, className)}
        aria-label={label || tooltip}
        {...others}
      />
    </Tooltip>
  );
}

export const Action = createPolymorphicComponent<'button', ActionProps>(
  _Action,
);
Action.displayName = 'Action';
