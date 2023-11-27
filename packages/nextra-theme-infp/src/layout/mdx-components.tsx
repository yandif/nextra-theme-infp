import cn from 'clsx';
import type { Components } from 'nextra/mdx';
import type { ComponentProps, ReactElement } from 'react';
import React, { useEffect, useRef } from 'react';

import type { AnchorProps } from '@/components/anchor';
import { Anchor } from '@/components/anchor';
import {
  Code,
  Details,
  Pre,
  Summary,
  Table,
  Td,
  Th,
  Tr,
} from '@/components/mdx';
import {
  useIntersectionObserver,
  useSetActiveAnchor,
  useSlugs,
} from '@/config/active-anchor';
import type { ThemeConfig } from '@/config/theme-schema';

// Anchor links
function HeadingLink({
  tag: Tag,
  context,
  children,
  id,
  className,
  ...props
}: ComponentProps<'h2'> & {
  tag: `h${2 | 3 | 4 | 5 | 6}`;
  context: { index: number };
}): ReactElement {
  const setActiveAnchor = useSetActiveAnchor();
  const slugs = useSlugs();
  const observer = useIntersectionObserver();
  const obRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!id) return;
    const heading = obRef.current;
    if (!heading) return;
    slugs.set(heading, [id, (context.index += 1)]);
    observer?.observe(heading);

    return () => {
      observer?.disconnect();
      slugs.delete(heading);
      setActiveAnchor((f) => {
        const ret = { ...f };
        delete ret[id];
        return ret;
      });
    };
  }, [id, context, slugs, observer, setActiveAnchor]);

  return (
    <Tag
      className={
        // can be added by footnotes
        className === 'sr-only'
          ? 'sr-only'
          : cn(
              'font-semibold tracking-tight text-slate-900 dark:text-slate-100',
              {
                h2: 'mt-10 border-b pb-1 text-3xl border-neutral-200/70 contrast-more:border-neutral-400 dark:border-primary-100/10 contrast-more:dark:border-neutral-400',
                h3: 'mt-8 text-2xl',
                h4: 'mt-8 text-xl',
                h5: 'mt-8 text-lg',
                h6: 'mt-8 text-base',
              }[Tag],
            )
      }
      {...props}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          id={id}
          className="subheading-anchor"
          aria-label="Permalink for this section"
          ref={obRef}
        />
      )}
    </Tag>
  );
}

const EXTERNAL_HREF_REGEX = /https?:\/\//;

export const Link = ({ href = '', className, ...props }: AnchorProps) => (
  <Anchor
    href={href}
    newWindow={EXTERNAL_HREF_REGEX.test(href)}
    className={cn(
      'text-primary-600 underline decoration-from-font [text-underline-position:from-font]',
      className,
    )}
    {...props}
  />
);

const A = ({ href = '', ...props }) => (
  <Anchor href={href} newWindow={EXTERNAL_HREF_REGEX.test(href)} {...props} />
);

export const getComponents = ({
  isRawLayout,
  components,
}: {
  isRawLayout?: boolean;
  components?: ThemeConfig['components'];
}): Components => {
  if (isRawLayout) {
    return { a: A };
  }

  const context = { index: 0 };
  return {
    h1: (props) => (
      <h1
        className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        {...props}
      />
    ),
    h2: (props) => <HeadingLink tag="h2" context={context} {...props} />,
    h3: (props) => <HeadingLink tag="h3" context={context} {...props} />,
    h4: (props) => <HeadingLink tag="h4" context={context} {...props} />,
    h5: (props) => <HeadingLink tag="h5" context={context} {...props} />,
    h6: (props) => <HeadingLink tag="h6" context={context} {...props} />,
    ul: (props) => (
      <ul className="mt-6 list-disc first:mt-0 ltr:ml-6 rtl:mr-6" {...props} />
    ),
    ol: (props) => (
      <ol
        className="mt-6 list-decimal first:mt-0 ltr:ml-6 rtl:mr-6"
        {...props}
      />
    ),
    li: (props) => <li className="my-2" {...props} />,
    blockquote: (props) => (
      <blockquote
        className={cn(
          'mt-6 border-gray-300 italic text-gray-700 dark:border-gray-700 dark:text-gray-400',
          'first:mt-0 ltr:border-l-2 ltr:pl-6 rtl:border-r-2 rtl:pr-6',
        )}
        {...props}
      />
    ),
    hr: (props) => (
      <hr
        className="my-8 border-neutral-200/70 contrast-more:border-neutral-400 dark:border-primary-100/10 contrast-more:dark:border-neutral-400"
        {...props}
      />
    ),
    a: Link,
    table: (props) => (
      <Table className="nextra-scrollbar mt-6 p-0 first:mt-0" {...props} />
    ),
    p: (props) => <p className="mt-6 leading-7 first:mt-0" {...props} />,
    tr: Tr,
    th: Th,
    td: Td,
    details: Details,
    summary: Summary,
    pre: Pre,
    code: Code,
    ...components,
  };
};
