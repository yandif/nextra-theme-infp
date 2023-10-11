import React from 'react';

import { BackToTop } from './components/back-to-top';
import { Button } from './components/ui/button';
import { Header } from './layout/header';

const App = () => {
  const [theme, setTheme] = React.useState('light');
  return (
    <>
      <Header />
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
