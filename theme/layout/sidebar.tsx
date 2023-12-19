import { observer } from '@legendapp/state/react';
import cn from 'clsx';
import { useState } from 'react';

import { Collapse } from '../components/collapse';

export const Sidebar = observer(() => {
  const [state, setState] = useState(false);
  return (
    <aside
      className={cn(
        'infp-scrollbar overflow-y-auto sticky top-16 min-w-[256px] p-4',
        'max-h-[calc(100vh-var(--infp-header-height)-env(safe-area-inset-bottom))] ',
      )}>
      <button onClick={() => setState(!state)}>Collapse.</button>
      <Collapse isOpen={state}>
        123123123123
        <br />
        123123123123
        <br />
        123123123123
        <br />
        123123123123
        <br />
      </Collapse>

      <div className="sticky bottom-0 h-8"> footer</div>
    </aside>
  );
});
