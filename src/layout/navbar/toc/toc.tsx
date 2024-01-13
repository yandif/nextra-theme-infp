import { observer } from '@legendapp/state/react';
import { Box, ScrollArea } from '@mantine/core';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import { useActiveAnchor, useStore } from '../../../contents';
import layoutClasses from '../../index.module.css';
import classes from './toc.module.css';
function useScrollIntoView() {
  const tocRef = useRef<HTMLDivElement>(null);
  const activeAnchor = useActiveAnchor();

  const activeSlug = Object.entries(activeAnchor).find(
    ([, { isActive }]) => isActive,
  )?.[0];
  useEffect(() => {
    if (!activeSlug) return;
    const anchor = tocRef.current?.querySelector(`a[href="#${activeSlug}"]`);

    if (anchor) {
      scrollIntoView(anchor, {
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
        scrollMode: 'always',
        boundary: tocRef.current,
      });
    }
  }, [activeSlug]);

  return tocRef;
}

export const Toc = observer(() => {
  const store = useStore();
  const activeAnchor = useActiveAnchor();
  const ref = useScrollIntoView();
  // const filePath = store.pageOpts.filePath.get();
  const headings = store.pageOpts.headings.get();

  const items = headings.map(({ id, depth, value }) => (
    <Box<'a'>
      component={'a'}
      key={id}
      href={`#${id}`}
      className={clsx(
        classes.link,
        activeAnchor[id]?.isActive ? classes.linkActive : layoutClasses.navLink,
      )}
      style={{
        paddingLeft: `calc(${depth - 1} * var(--mantine-spacing-md))`,
      }}>
      {value}
    </Box>
  ));

  return (
    <ScrollArea.Autosize
      className={classes.root}
      viewportRef={ref}
      type="never">
      {items}
    </ScrollArea.Autosize>
  );
});
