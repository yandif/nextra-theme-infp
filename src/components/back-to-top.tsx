import { ActionIcon } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import classes from './back-to-top.module.css';

export const BackToTop = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function toggleVisible() {
      const { scrollTop } = document.documentElement;
      ref.current?.classList.toggle(classes.visible, scrollTop < 300);
    }

    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <ActionIcon
      className={clsx(classes.root, classes.visible)}
      variant="light"
      ref={ref}
      aria-hidden="true"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <IconArrowUp size="1rem" stroke={2} />
    </ActionIcon>
  );
};
