import type { ComponentProps, FC } from 'react';

export const ArrowTopIcon: FC<ComponentProps<'svg'>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="icon icon-tabler icon-tabler-arrow-up"
      viewBox="0 0 24 24"
      {...props}>
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M12 5v14M18 11l-6-6M6 11l6-6" />
    </svg>
  );
};
