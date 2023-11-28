import React from 'react';

import { BackToTop } from './components/back-to-top';
import { WordWrapIcon } from './components/icons';
import { Button } from './components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './components/ui/collapsible';
import { useIsAtTop } from './hooks/use-is-at-top';
import { cn } from './utils/utils';

const App = () => {
  const [theme, setTheme] = React.useState('light');
  const isAtTop = useIsAtTop();
  return (
    <>
      <div className="flex-1 flex sticky top-0 items-center justify-center h-[64px]">
        <div
          className={cn(
            'flex items-center justify-center px-6 h-9 rounded-full',
            isAtTop &&
              'transition-[box-shadow] shadow-[0_2px_4px_rgba(0,0,0,.08),0_1px_0_rgba(0,0,0,.1)] dark:shadow-[0_-1px_0_rgba(255,255,255,.2)_inset]',
          )}>
          menu
        </div>
      </div>
      <Collapsible>
        <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
      <Button
        variant="outline"
        className="min-w-[36px] w-[36px] p-0 flex items-center justify-center"
        title="Toggle word wrap">
        <WordWrapIcon className="pointer-events-none h-4 w-4" />
      </Button>
      <div className="h-[200vh] px-64">
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500"
          onClick={() => {
            const next = theme === 'light' ? 'dark' : 'light';
            setTheme(next);
            const html = document.querySelector('html');
            html?.setAttribute('class', next);
            html?.setAttribute('style', 'color-scheme: ' + next + ';');
          }}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </Button>
        {new Array(20).fill(
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            deleniti nostrum accusantium molestiae, eum suscipit sunt illum
            cupiditate consequuntur porro obcaecati fuga beatae dolor
            consectetur tempore praesentium assumenda ab! Similique.
          </h1>,
        )}
      </div>

      <BackToTop />
    </>
  );
};
export default App;
