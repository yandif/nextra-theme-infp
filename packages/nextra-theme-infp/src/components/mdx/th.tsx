import cn from 'clsx';
import type { ComponentProps, FC } from 'react';
import React from 'react';

export const Th: FC<ComponentProps<'th'>> = ({ className = '', ...props }) => (
  <th
    className={cn(
      'm-0 border border-gray-300 px-4 py-2 font-semibold dark:border-gray-600',
      className,
    )}
    {...props}
  />
);
