import './App.css';

function App() {
  import('../wasm-module/pkg').then(async (wasm) => {
    await wasm.default();
    wasm.console();
  });

  return <div className='App'></div>;
}

export default App;
