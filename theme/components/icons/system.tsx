import type { ComponentProps, FC } from 'react';

export const SystemIcon: FC<ComponentProps<'svg'>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="icon icon-tabler icon-tabler-device-desktop"
    viewBox="0 0 24 24"
    {...props}>
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5zM7 20h10M9 16v4M15 16v4" />
  </svg>
);
