import { observer } from '@legendapp/state/react';

import { useStore } from '../../../contents';
import classes from './toc.module.css';

export const Toc = observer(() => {
  const store = useStore();
  const filePath = store.pageOpts.filePath.get();
  const headings = store.pageOpts.headings.get();

  return <></>;
});
