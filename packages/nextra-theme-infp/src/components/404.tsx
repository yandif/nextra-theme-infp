// import { useRouter } from 'next/router';
// import { useMounted } from 'nextra/hooks';
import { observer } from '@legendapp/state/react';
import React from 'react';

export const NotFoundPage = observer(() => {
  // const config = useConfig();
  // const mounted = useMounted();
  // const { asPath } = useRouter();
  // const { content, labels } = config.notFound;
  // if (!content) {
  //   return null;
  // }

  return (
    <div>123</div>
    // <p className="nx-text-center">
    //   <Anchor
    //     href={getGitIssueUrl({
    //       repository: config.docsRepositoryBase,
    //       title: `Found broken \`${mounted ? asPath : ''}\` link. Please fix!`,
    //       labels,
    //     })}
    //     newWindow
    //     className="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]">
    //     {renderComponent(content)}
    //   </Anchor>
    // </p>
  );
});
