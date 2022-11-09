import { Routes, Route, BrowserRouter } from 'react-router-dom';

import type { PageTypes, ReactRouterMapType } from './types';

import authenticator from './authenticator';

type Props = {
  auth: string;
  routerMap: Array<ReactRouterMapType>;
  wrongAccessPage: JSX.Element;
  notFoundPage: JSX.Element;
  addElement?: (page: JSX.Element, pageType: PageTypes) => JSX.Element;
};

function ReactRouter({
  auth,
  routerMap,
  wrongAccessPage,
  notFoundPage,
  addElement,
}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        {routerMap.map(({ auth: pageAuth, path, page }) => {
          const [certifiedPage, isWrongAccessPage]: [JSX.Element, boolean] =
            authenticator({ auth, pageAuth, wrongAccessPage, page });

          const render: JSX.Element =
            typeof addElement === 'function'
              ? addElement(
                  certifiedPage,
                  isWrongAccessPage ? 'wrongAccess' : pageAuth,
                )
              : certifiedPage;

          return <Route path={path} element={render} key={path} />;
        })}
        <Route
          path='*'
          element={
            typeof addElement === 'function'
              ? addElement(notFoundPage, 'notFound')
              : notFoundPage
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

ReactRouter.defaultProps = {
  pageWrapper: undefined,
};

export type { Props as ReactRouterProps };
export default ReactRouter;
