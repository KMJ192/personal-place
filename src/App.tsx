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
        <ReactRouter.Page path='admin/test'>
          <TestPage />
        </ReactRouter.Page>
      </ReactRouter.Auth>
    </ReactRouter.Container>
  );
}

export default App;
