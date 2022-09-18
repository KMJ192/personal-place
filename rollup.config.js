import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import analyze from 'rollup-plugin-analyzer';
import alias from '@rollup/plugin-alias';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';

const isDevBuild = process.env.BUILD === 'build';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const input = 'index.ts';

const dir = 'dist';

const output = [
  {
    format: 'esm',
    exports: 'named',
    sourcemap: true,
    file: `${dir}/index.js`,
  },
];

const plugins = [
  analyze({
    summaryOnly: true,
  }),
  typescript({
    useTsconfigDeclarationDir: true,
  }),
  babel({
    babelHelpers: 'bundled',
    extensions,
    include: ['src/**/*'],
    presets: ['@babel/preset-env', '@babel/preset-react'],
  }),
  commonjs({ include: /node_modules/ }),
  nodeResolve({ extensions }),
  alias({
    entries: [
      {
        find: '@src',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  }),
  terser(),
];

if (!isDevBuild) {
  plugins.push(
    strip({
      include: '**/*.(js|jsx|ts|tsx)',
    }),
  );
}

export default {
  input,
  output,
  plugins,
};
