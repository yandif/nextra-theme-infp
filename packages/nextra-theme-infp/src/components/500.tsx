import { observer } from '@legendapp/state/react';
import React from 'react';

import { Anchor } from './anchor';

export const ServerSideErrorPage = observer(() => {
  return (
    <p className="text-center">
      <Anchor
        href={'https://yandif.com'}
        newWindow
        className="text-primary-600 underline decoration-from-font [text-underline-position:from-font]">
        札记
      </Anchor>
    </p>
  );
});
