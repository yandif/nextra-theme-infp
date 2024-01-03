import { Box, Button, Collapse, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { ComponentProps, FC, ReactElement, ReactNode } from 'react';
import { Children, cloneElement } from 'react';

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

  return (
    <Box>
      <Button onClick={toggle}>{summary}</Button>

      <Collapse in={opened}>
        <Text>{restChildren}</Text>
      </Collapse>
    </Box>
  );
};

export const Summary: FC<ComponentProps<'summary'>> = (props) => (
  <p>{props.children}</p>
);
