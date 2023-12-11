import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

export type AnchorProps = ComponentPropsWithoutRef<'a'> & {
  newWindow?: boolean;
};

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ href = '', children, newWindow, ...props }, forwardedRef) => {
    if (newWindow) {
      return (
        <a
          ref={forwardedRef}
          href={href}
          target="_blank"
          rel="noreferrer"
          {...props}>
          {children}
          <span className="sr-only select-none"> (opens in a new tab)</span>
        </a>
      );
    }

    if (!href) {
      return (
        <a ref={forwardedRef} {...props}>
          {children}
        </a>
      );
    }

    return (
      <NextLink ref={forwardedRef} href={href} {...props}>
        {children}
      </NextLink>
    );
  },
);

Anchor.displayName = 'Anchor';
