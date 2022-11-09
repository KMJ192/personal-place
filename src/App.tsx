import ReactRouter from './ReactRouter/ReactRouter';
import type { ReactRouterMapType } from './ReactRouter';

import RootPage from './pages/RootPage';
import TestPage from './pages/TestPage';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';

import './App.css';

const routerMap: Array<ReactRouterMapType> = [
  {
    auth: 'common',
    path: '/',
    element: <RootPage />,
  },
  {
    auth: 'admin',
    path: '/admin/test',
    element: <TestPage />,
  },
  {
    auth: 'user',
    path: '/user/test1',
    element: <TestPage2 />,
  },
  {
    auth: 'user',
    path: '/user/test2',
    element: <TestPage3 />,
  },
];

function App() {
  // import('../wasm-module/pkg').then(async (wasm) => {
  //   await wasm.default();
  //   wasm.console();
  // });

  return (
    <ReactRouter
      auth='admin'
      routerMap={routerMap}
      wrongAccessElement={<div>Wrong Access</div>}
      notFoundElement={<div>404 Not Found</div>}
      addElement={(page: JSX.Element) => {
        return (
          <div>
            test <div>{page}</div>
          </div>
        );
      }}
    />
  );
}

export default App;
