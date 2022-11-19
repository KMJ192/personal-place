import ReactRouter from './ReactRouter/ReactRouter';
import type { ReactRouterMapType, PageTypes } from './ReactRouter';

import RootPage from './pages/RootPage';
import TestPage from './pages/TestPage';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';
import TrieTestPage from './pages/TrieTestPage';
import PieChartPage from './pages/PieChartPage/PieChartPage';

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
];

function App() {
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
    />
  );
}

export default App;
