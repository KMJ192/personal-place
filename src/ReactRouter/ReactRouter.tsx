import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Authentication from './Authentication';
import type { ReactRouterMapType } from './types';

type Props = {
  auth: string;
  routerMap: Array<ReactRouterMapType>;
  wrongAccess: JSX.Element;
  notFound: JSX.Element;
  pageWrapper?: (page: JSX.Element) => JSX.Element;
};

function ReactRouter({
  auth,
  routerMap,
  wrongAccess,
  notFound,
  pageWrapper,
}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        {routerMap.map(({ auth: componentAuth, path, component }) => {
          const authCompo: JSX.Element = (
            <Authentication
              auth={auth}
              componentAuth={componentAuth}
              wrongAccess={wrongAccess}
              component={component}
            />
          );

          const render: JSX.Element =
            typeof pageWrapper === 'function'
              ? pageWrapper(authCompo)
              : authCompo;

          return <Route path={path} element={render} key={path} />;
        })}
        <Route
          path='*'
          element={
            typeof pageWrapper === 'function' ? pageWrapper(notFound) : notFound
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
