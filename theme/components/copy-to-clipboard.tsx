import cn from 'clsx';
import type { ComponentProps, ReactElement } from 'react';
import React, { useCallback, useEffect, useState } from 'react';

import { CheckIcon, CopyIcon } from './icons';
import type { ButtonProps } from './ui/button';
import { Button } from './ui/button';

export const CopyToClipboard = ({
  getValue,
  className,
  ...props
}: {
  getValue: () => string;
} & ButtonProps): ReactElement => {
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timerId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isCopied]);

  const handleClick = useCallback<
    NonNullable<ComponentProps<'button'>['onClick']>
  >(async () => {
    setCopied(true);
    if (!navigator?.clipboard) {
      console.error('Access to clipboard rejected!');
    }
    try {
      await navigator.clipboard.writeText(getValue());
    } catch {
      console.error('Failed to copy!');
    }
  }, [getValue]);

  const IconToUse = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      title="Copy code"
      tabIndex={0}
      className={cn(
        'min-w-[36px] w-[36px] p-0 flex items-center justify-center',
        className,
      )}
      {...props}>
      <IconToUse className="nextra-copy-icon pointer-events-none h-4 w-4" />
    </Button>
  );
};
