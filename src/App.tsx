import { Link } from 'react-router-dom';

import ReactRouter from './ReactRouter/ReactRouter';
import type { ReactRouterMapType, PageTypes } from './ReactRouter';

import RootPage from './pages/RootPage';
import TestPage from './pages/TestPage';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';
import TrieTestPage from './pages/TrieTestPage';
import PieChartPage from './pages/PieChartPage/PieChartPage';
import VirtualScrollTestPage from './pages/VirtualScrollTestPage/VirtualScrollTestPage';
import InfinityScrollTestPage from './pages/InfinityScrollTestPage/InfinityScrollTestPage';

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
    auth: ['admin', 'user'],
    path: '/user/test1',
    page: <TestPage2 />,
  },
  {
    auth: 'user',
    path: '/user/test2',
    page: <TestPage3 />,
  },
  {
    auth: ['admin', 'user'],
    path: '/chart/pie-chart',
    page: <PieChartPage />,
  },
  {
    auth: 'common',
    path: '/test/virtual-scroll',
    page: <VirtualScrollTestPage />,
  },
  {
    auth: 'common',
    path: '/test/infinity-scroll',
    page: <InfinityScrollTestPage />,
  },
];

function App() {
  // import('@wasm/pkg').then(async (wasm) => {
  //   (await wasm.default()).console();
  // });
  return (
    <ReactRouter
      auth='user'
      routerMap={routerMap}
      wrongAccessPage={<div>Wrong Access</div>}
      notFoundPage={<div>404 Not Found</div>}
      errorPage={<div>Sorry... Error,,,</div>}
      addedElement={(page: JSX.Element, pageType: PageTypes) => {
        return (
          <div>
            {Array.isArray(pageType) ? pageType.join(', ') : pageType}{' '}
            <div>{page}</div>
          </div>
        );
      }}
    >
      <>
        {routerMap.map(({ path }, idx) => (
          <Link
            key={idx}
            style={{
              marginRight: '2px',
            }}
            to={path}
          >
            <button>{path}</button>
          </Link>
        ))}
      </>
    </ReactRouter>
  );
}

export default App;
