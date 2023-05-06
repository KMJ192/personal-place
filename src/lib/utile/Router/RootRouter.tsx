import type { ReactNode } from 'react';

import Router from './Router';
import ErrorBoundary from './ErrorBoundary';

import { routerMap } from './routerMap';
import type { RouterMap } from './types';

type Props = {
  error500?: ReactNode;
  notFound404?: ReactNode;
  forbidden403?: ReactNode;
  extractElement?: (
    page: ReactNode,
    pageInfo: Omit<RouterMap, 'page'>,
  ) => ReactNode;
};

function RootRouter({
  error500,
  notFound404,
  forbidden403,
  extractElement,
}: Props) {
  return (
    <ErrorBoundary fallback={error500}>
      <Router
        auth='admin'
        routerMap={routerMap}
        notFoundPage={notFound404}
        wrongAccessPage={forbidden403}
        extractElement={extractElement}
      >
        <div></div>
      </Router>
    </ErrorBoundary>
  );
}

export default RootRouter;
