import './App.css';
import ReactRouter from './Router/ReactRouter';

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
      <div>test</div>
    </ReactRouter.Container>
  );
}

export default App;
