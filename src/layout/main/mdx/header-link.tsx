import { Anchor, Title, TitleOrder, TitleProps } from '@mantine/core';
import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';

import {
  useIntersectionObserver,
  useSetActiveAnchor,
  useSlugs,
} from '../../../contents';
import classes from './header-link.module.css';

type HeadingLinkProps = TitleProps & {
  order: TitleOrder;
  context: { index: number };
};

export const HeadingLink: FC<HeadingLinkProps> = ({
  context,
  children,
  id,
  order,
  ...props
}) => {
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

  const className = {
    1: classes.h1,
    2: classes.h2,
    3: classes.h3,
    4: classes.h4,
    5: classes.h5,
    6: classes.h6,
  }[order];

  return (
    <Title
      {...props}
      order={order}
      className={clsx(className, props.className)}>
      {children}
      {id && (
        <Anchor
          className={classes.anchor}
          href={`#${id}`}
          id={id}
          underline="never"
          aria-label="Permalink for this section"
          ref={obRef}
        />
      )}
    </Title>
  );
};
