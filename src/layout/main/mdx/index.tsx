import { Anchor, Blockquote, Code, Divider, Table } from '@mantine/core';
import NextLink from 'next/link';
import { Components } from 'nextra/mdx';

import { DefaultThemeConfig } from '../../../contents';
import { HeadingLink } from './header-link';
import classes from './index.module.css';

export const getComponents = ({
  isRawLayout,
  components,
}: {
  isRawLayout: boolean;
  components: DefaultThemeConfig['components'];
}): Components => {
  if (isRawLayout) {
    return { a: (props) => <Anchor target="_blank" {...(props as any)} /> };
  }

  const context = { index: 0 };
  return {
    h1: (props) => <HeadingLink order={1} context={context} {...props} />,
    h2: (props) => <HeadingLink order={2} context={context} {...props} />,
    h3: (props) => <HeadingLink order={3} context={context} {...props} />,
    h4: (props) => <HeadingLink order={4} context={context} {...props} />,
    h5: (props) => <HeadingLink order={5} context={context} {...props} />,
    h6: (props) => <HeadingLink order={6} context={context} {...props} />,
    ul: (props) => <ul className={classes.ul} {...props} />,
    ol: (props) => <ol className={classes.ol} {...props} />,
    li: (props) => <li className={classes.li} {...props} />,
    strong: (props) => <strong className={classes.strong} {...props} />,
    p: (props) => <p className={classes.p} {...props} />,
    blockquote: (props) => <Blockquote p="md" mt="md" {...(props as any)} />,
    code: (props) => <Code {...(props as any)} />,
    a: (props) => (
      <Anchor
        component={NextLink}
        target={/https?:\/\//.test(props.href || '') ? '_blank' : '_self'}
        {...(props as any)}
      />
    ),
    hr: (props) => <Divider my="md" {...(props as any)} />,
    table: (props) => (
      <Table.ScrollContainer minWidth={500}>
        <Table
          className={classes.table}
          withTableBorder
          withColumnBorders
          highlightOnHover
          striped
          {...(props as any)}
        />
      </Table.ScrollContainer>
    ),
    thead: (props) => <Table.Thead {...(props as any)} />,
    tbody: (props) => <Table.Tbody {...(props as any)} />,
    tr: (props) => <Table.Tr {...(props as any)} />,
    th: (props) => <Table.Th className={classes.th} {...(props as any)} />,
    td: (props) => <Table.Td className={classes.td} {...(props as any)} />,
    ...components,
  };
};
