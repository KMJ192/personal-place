import ReactRouter from './ReactRouter/ReactRouter';
import type { ReactRouterMapType, PageTypes } from './ReactRouter';

import RootPage from './pages/RootPage';
import TestPage from './pages/TestPage';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';
import TrieTestPage from './pages/TrieTestPage';

import './App.css';

const routerMap: Array<ReactRouterMapType> = [
  {
    auth: 'common',
    path: '/',
    page: <RootPage />,
  },
  {
    auth: 'common',
    path: '/test/trie',
    page: <TrieTestPage />,
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
  import('../wasm-module/pkg').then(async (wasm) => {
    await wasm.default();
    // wasm.console();
    const d = JSON.stringify({
      test1: 'test1',
      test2: 'test2',
    });
    // console.log(d);
    wasm.get_data(d);
  });

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
