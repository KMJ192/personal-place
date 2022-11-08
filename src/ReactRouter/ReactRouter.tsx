import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Authentication from './Authentication';
import type { ReactRouterMapType } from './types';

type Props = {
  auth: string;
  routerMap: Array<ReactRouterMapType>;
  wrongAccess: JSX.Element;
  notFound: JSX.Element;
};

function ReactRouter({
  auth,
  routerMap,
  wrongAccess,
  notFound: NotFound,
}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        {routerMap.map(({ auth: componentAuth, path, component }) => {
          return (
            <Route
              path={path}
              element={
                <Authentication
                  auth={auth}
                  componentAuth={componentAuth}
                  wrongAccess={wrongAccess}
                  component={component}
                />
              }
              key={path}
            />
          );
        })}
        <Route path='*' element={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

export type { Props as ReactRouterProps };
export default ReactRouter;
