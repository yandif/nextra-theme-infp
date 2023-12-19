import { observer } from '@legendapp/state/react';
import cn from 'clsx';
import type { Heading } from 'nextra';
import { useEffect, useMemo, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import { Anchor } from '../components/anchor';
import { BackToTop } from '../components/back-to-top';
import { useActiveAnchor } from '../content/active-anchor';
import { useStore } from '../content/context';
import { renderComponent } from '../utils/render';

export type TOCProps = {
  headings: Heading[];
  filePath: string;
};

const linkClassName = cn(
  'text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
  'contrast-more:text-gray-800 contrast-more:dark:text-gray-50',
);

export const TOC = observer<TOCProps>(({ headings, filePath }) => {
  const activeAnchor = useActiveAnchor();
  const config = useStore().themeConfig.get();

  const tocRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => headings.filter((heading) => heading.depth > 1),
    [headings],
  );

  const hasHeadings = items.length > 0;
  const hasMetaInfo = Boolean(
    config.feedback.content ||
      config.editLink.component ||
      config.toc.extraContent,
  );

  const activeSlug = Object.entries(activeAnchor).find(
    ([, { isActive }]) => isActive,
  )?.[0];

  useEffect(() => {
    if (!activeSlug) return;
    const anchor = tocRef.current?.querySelector(
      `li > a[href="#${activeSlug}"]`,
    );

    if (anchor) {
      scrollIntoView(anchor, {
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
        scrollMode: 'always',
        boundary: tocRef.current,
      });
    }
  }, [activeSlug]);

  return (
    <div
      ref={tocRef}
      className={cn(
        'infp-scrollbar sticky top-16 overflow-y-auto pr-4 pt-6 text-sm [hyphens:auto]',
        'max-h-[calc(100vh-var(--infp-header-height)-env(safe-area-inset-bottom))] -mr-4',
      )}>
      {hasHeadings && (
        <>
          <p className="mb-4 font-semibold tracking-tight">
            {renderComponent(config.toc.title)}
          </p>
          <ul>
            {items.map(({ id, value, depth }) => (
              <li className="my-2 scroll-my-6 scroll-py-6" key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    {
                      2: 'font-semibold',
                      3: 'pl-4',
                      4: 'pl-8',
                      5: 'pl-12',
                      6: 'pl-16',
                    }[depth as Exclude<typeof depth, 1>],
                    'inline-block',
                    activeAnchor[id]?.isActive
                      ? 'text-blue-600 subpixel-antialiased contrast-more:!text-blue-600'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
                    'contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 w-full break-words',
                  )}>
                  {config.toc.headingComponent?.({
                    id,
                    children: value,
                  }) ?? value}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {hasMetaInfo && (
        <div
          className={cn(
            hasHeadings && ' bg-white dark:bg-dark mt-8 pt-8',
            'sticky bottom-0 flex flex-col items-start gap-2 pb-8 ',
            'contrast-more:border-t contrast-more:border-neutral-400 contrast-more:shadow-none contrast-more:dark:border-neutral-400',
          )}>
          {config.feedback.content ? (
            <Anchor
              className={linkClassName}
              href={config.feedback.useLink()}
              newWindow>
              {renderComponent(config.feedback.content)}
            </Anchor>
          ) : null}

          {renderComponent(config.editLink.component, {
            filePath,
            className: linkClassName,
            children: renderComponent(config.editLink.text),
          })}

          {renderComponent(config.toc.extraContent)}

          {config.toc.backToTop && <BackToTop className={linkClassName} />}
        </div>
      )}
    </div>
  );
});
