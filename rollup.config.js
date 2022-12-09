import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
// import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'esm'
      }
    ],
    plugins: [
      typescript(),
      // nodeResolve()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'esm'
      }
    ],
    plugins: [
      dts()
    ],
  }
]
