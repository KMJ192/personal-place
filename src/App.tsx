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
    component: <RootPage />,
  },
  {
    auth: 'admin',
    path: '/admin/test',
    component: <TestPage />,
  },
  {
    auth: 'user',
    path: '/user/test1',
    component: <TestPage2 />,
  },
  {
    auth: 'user',
    path: '/user/test2',
    component: <TestPage3 />,
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
      wrongAccess={<div>잘못된 접근입니다.</div>}
      notFound={<div>404 Not Found</div>}
    />
  );
}

export default App;
