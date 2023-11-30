import cn from 'clsx';
import type { ComponentProps, FC } from 'react';
import React from 'react';

export const Table: FC<ComponentProps<'table'>> = ({
  className = '',
  ...props
}) => <table className={cn('block overflow-x-scroll', className)} {...props} />;
