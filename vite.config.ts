import path from 'path';
import { defineConfig, LibraryOptions, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import wasmPack from 'vite-plugin-wasm-pack';
import dts from 'vite-plugin-dts';

const isLibBuild = process.env.BUILD === 'lib';

const outDir = isLibBuild ? 'build' : 'dist';
const lib: false | LibraryOptions = isLibBuild
  ? {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'react-function',
      formats: ['es'],
      fileName: (format) => `react-function.${format}.js`,
    }
  : false;

const plugins = isLibBuild
  ? [dts(), react(), wasmPack('./wasm-module')]
  : [react(), wasmPack('./wasm-module')];

const config = ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@wasm': path.resolve(__dirname, './wasm-module'),
      },
    },
    plugins,
    build: {
      outDir,
      lib,
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    preview: {
      open: true,
    },
  });
};

export default config;
