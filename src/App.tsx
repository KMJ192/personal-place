import ReactRouter from './ReactRouter/ReactRouter';
import type { ReactRouterMapType, PageTypes } from './ReactRouter';

import RootPage from './pages/RootPage';
import TestPage from './pages/TestPage';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';

import './App.css';

const routerMap: Array<ReactRouterMapType> = [
  {
    auth: 'common',
    path: '/',
    page: <RootPage />,
  },
  {
    auth: 'admin',
    path: '/admin/test',
    page: <TestPage />,
  },
  {
    auth: 'user',
    path: '/user/test1',
    page: <TestPage2 />,
  },
  {
    auth: 'user',
    path: '/user/test2',
    page: <TestPage3 />,
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
      wrongAccessPage={<div>Wrong Access</div>}
      notFoundPage={<div>404 Not Found</div>}
      erroPage={<div>Sorry... Error,,,</div>}
      addElement={(page: JSX.Element, pageType: PageTypes) => {
        return (
          <div>
            {pageType} <div>{page}</div>
          </div>
        );
      }}
    />
  );
}

export default App;
