import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Authentication from './Authentication';
import type { ReactRouterMapType } from './types';

type Props = {
  auth: string;
  routerMap: Array<ReactRouterMapType>;
  wrongAccessElement: JSX.Element;
  notFoundElement: JSX.Element;
  addElement?: (page: JSX.Element) => JSX.Element;
};

function ReactRouter({
  auth,
  routerMap,
  wrongAccessElement,
  notFoundElement,
  addElement,
}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        {routerMap.map(({ auth: componentAuth, path, element }) => {
          const authCompo: JSX.Element = (
            <Authentication
              auth={auth}
              componentAuth={componentAuth}
              wrongAccessElement={wrongAccessElement}
              element={element}
            />
          );

          const render: JSX.Element =
            typeof addElement === 'function'
              ? addElement(authCompo)
              : authCompo;

          return <Route path={path} element={render} key={path} />;
        })}
        <Route
          path='*'
          element={
            typeof addElement === 'function'
              ? addElement(notFoundElement)
              : notFoundElement
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
