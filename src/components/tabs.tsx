import { Tabs as MantineTabs } from '@mantine/core';
import { Children, cloneElement, ReactElement, ReactNode } from 'react';

export const Tab = MantineTabs.Panel;

const transformTabs = (children: ReactNode, items: string[]) => {
  const tabs: any[] = [];

  Children.forEach(children, (child) => {
    if (child && (child as ReactElement).type === Tab) {
      tabs.push(child);
    }
  });

  return tabs.map((tab, index) =>
    cloneElement(tab, { key: items[index], value: items[index] }),
  );
};

export function Tabs({
  items,
  children,
}: {
  items: string[];
  children: ReactNode;
}) {
  const panels = transformTabs(children, items);

  return (
    <MantineTabs mt="xl" defaultValue={items[0]}>
      <MantineTabs.List>
        {items.map((item) => (
          <MantineTabs.Tab key={item} value={item}>
            {item}
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>
      {panels}
    </MantineTabs>
  );
}

Tabs.Tab = Tab;
