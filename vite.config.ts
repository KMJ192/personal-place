import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasmPack from 'vite-plugin-wasm-pack';

export default defineConfig({
  plugins: [react(), wasmPack('./wasm-module')],
  resolve: {
    alias: [
      {
        find: '@src',
        replacement: '/src',
      },
      {
        find: '@lib',
        replacement: '/src/lib',
      },
      {
        find: '@hooks',
        replacement: '/src/lib/hooks',
      },
      {
        find: '@components',
        replacement: '/src/lib/components/',
      },
    ],
  },
  build: {
    outDir: 'build',
    target: 'modules',
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'sample',
      formats: ['cjs', 'es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      treeshake: true,
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
