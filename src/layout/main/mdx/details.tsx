import { Box, Collapse, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import { useMounted } from 'nextra/hooks';
import type { ComponentProps, FC, ReactElement, ReactNode } from 'react';
import { Children, cloneElement } from 'react';

import classes from './details.module.css';

const findSummary = (children: ReactNode) => {
  let summary: ReactNode = null;
  const restChildren: ReactNode[] = [];

  Children.forEach(children, (child, index) => {
    if (child && (child as ReactElement).type === Summary) {
      summary ||= child;
      return;
    }

    let c = child;
    if (
      !summary &&
      child &&
      typeof child === 'object' &&
      (child as ReactElement).type !== Details &&
      'props' in child &&
      child.props
    ) {
      const result = findSummary(child.props.children);
      summary = result[0];
      c = cloneElement(child, {
        ...child.props,
        children: result[1]?.length ? result[1] : undefined,
        key: index,
      });
    }
    restChildren.push(c);
  });

  return [summary, restChildren];
};

export const Details: FC<ComponentProps<'details'>> = ({ children }) => {
  const [summary, restChildren] = findSummary(children);
  const [opened, { toggle }] = useDisclosure(false);
  const mounted = useMounted();

  return (
    <Box className={classes.details}>
      <UnstyledButton
        className={classes.toggle}
        onClick={toggle}
        data-opened={opened}>
        <IconChevronRight size={16} stroke={2} />
        {summary}
      </UnstyledButton>

      {mounted && (
        <Collapse in={opened}>
          <Box className={classes.collapse}>{restChildren}</Box>
        </Collapse>
      )}
    </Box>
  );
};

export const Summary: FC<ComponentProps<'summary'>> = (props) => (
  <p>{props.children}</p>
);
