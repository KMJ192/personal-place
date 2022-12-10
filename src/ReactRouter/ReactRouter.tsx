import { Routes, Route, BrowserRouter } from 'react-router-dom';

import type { PageTypes, ReactRouterMapType } from './types';

import authenticator from './authenticator';
import ErrorBoundary from '@src/ErrorBoundary';

type Props = {
  auth: string;
  routerMap: Array<ReactRouterMapType>;
  wrongAccessPage: JSX.Element;
  notFoundPage: JSX.Element;
  errorPage: JSX.Element;
  children?: JSX.Element;
  addedElement?: (page: JSX.Element, pageType: PageTypes) => JSX.Element;
};

function ReactRouter({
  auth,
  routerMap,
  wrongAccessPage,
  notFoundPage,
  errorPage,
  children,
  addedElement = (page: JSX.Element) => page,
}: Props) {
  return (
    <ErrorBoundary fallback={errorPage}>
      <BrowserRouter>
        <Routes>
          {routerMap.map(({ auth: pageAuth, path, page }) => {
            const [certifiedPage, cert]: [JSX.Element, 0 | 1] = authenticator({
              auth,
              pageAuth,
              wrongAccessPage,
              page,
            });

            const render: JSX.Element = addedElement(
              certifiedPage,
              cert === 0 ? 'wrongAccess' : pageAuth,
            );

            return <Route path={path} element={render} key={path} />;
          })}
          <Route path='*' element={addedElement(notFoundPage, 'notFound')} />
        </Routes>
        {children}
      </BrowserRouter>
    </ErrorBoundary>
  );
}

ReactRouter.defaultProps = {
  addedElement: (page: JSX.Element) => page,
};

export type { Props as ReactRouterProps };
export default ReactRouter;
