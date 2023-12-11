import cn from 'clsx';
import type { ComponentProps, FC } from 'react';

export const Table: FC<ComponentProps<'table'>> = ({
  className = '',
  ...props
}) => (
  <table
    className={cn('block overflow-x-scroll mr-[-12px]]', className)}
    {...props}
  />
);
