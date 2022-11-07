import { useRef, useState } from 'react';

import ReactRouter from './Router/ReactRouter';

import './App.css';
import TestPage from './pages/TestPage';

function App() {
  // import('../wasm-module/pkg').then(async (wasm) => {
  //   await wasm.default();
  //   wasm.console();
  // });

  return (
    <ReactRouter.Container
      permission={[
        {
          auth: 'admin',
        },
        {
          auth: 'user',
        },
      ]}
    >
      <ReactRouter.Auth auth='admin'>
        <TestPage />
      </ReactRouter.Auth>
      {/* <ReactRouter.Page path='admin/test'></ReactRouter.Page> */}
    </ReactRouter.Container>
  );
}

export default App;
