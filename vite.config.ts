import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import wasmPack from 'vite-plugin-wasm-pack';

const config = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
      },
    },
    plugins: [react(), wasmPack('./wasm-module')],
    build: { outDir: 'build' },
    preview: {
      open: true,
    },
  });
};

export default config;
