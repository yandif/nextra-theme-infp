import {
  ActionIcon,
  Box,
  CopyButton,
  rem,
  ScrollArea,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { IconCheck, IconCopy, IconTextWrap } from '@tabler/icons-react';
import type { ComponentProps, FC } from 'react';
import { useCallback, useRef } from 'react';

import classes from './pre.module.css';

type PreProps = ComponentProps<'pre'> & {
  filename?: string;
  hasCopyCode?: boolean;
};

import { useLocale } from '../../../contents';

export const Pre: FC<PreProps> = ({
  children,
  hasCopyCode,
  filename,
  ...props
}) => {
  const preRef = useRef<HTMLPreElement | null>(null);
  const locale = useLocale();

  const toggleWordWrap = useCallback(() => {
    const htmlDataset = document.documentElement.dataset;
    const hasWordWrap = 'infpWordWrap' in htmlDataset;
    if (hasWordWrap) {
      delete htmlDataset.infpWordWrap;
    } else {
      htmlDataset.infpWordWrap = '';
    }
  }, []);

  return (
    <UnstyledButton component="div" className={classes.root}>
      {filename && <div className={classes.filename}>{filename}</div>}

      <ScrollArea>
        <Box
          component="pre"
          className={classes.pre}
          ref={preRef as any}
          data-filename={!!filename}
          {...props}
          dir="rtl">
          {children}
        </Box>
      </ScrollArea>

      <Box className={classes.actions} data-filename={!!filename}>
        <Tooltip label={locale.codeWrap} withArrow>
          <ActionIcon variant="subtle" color="gray" onClick={toggleWordWrap}>
            <IconTextWrap style={{ width: rem(16) }} />
          </ActionIcon>
        </Tooltip>
        {hasCopyCode && (
          <CopyButton
            value={preRef.current?.querySelector('code')?.textContent || ''}
            timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? locale.copied : locale.copy} withArrow>
                <ActionIcon
                  color={copied ? 'teal' : 'gray'}
                  variant="subtle"
                  onClick={copy}>
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconCopy style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        )}
      </Box>
    </UnstyledButton>
  );
};
