import cn from 'clsx';
import type { ComponentProps } from 'react';
import React from 'react';

export const Td = ({ className = '', ...props }: ComponentProps<'td'>) => (
  <td
    className={cn(
      'm-0 border border-gray-300 px-4 py-2 dark:border-gray-600',
      className,
    )}
    {...props}
  />
);
