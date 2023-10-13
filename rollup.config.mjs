'use strict';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import clear from 'rollup-plugin-clear';
import screeps from 'rollup-plugin-screeps-world';
import typescript from 'rollup-plugin-typescript2';

let config;
const dest = process.env.DEST;
if (!dest) {
  console.log('No destination specified - code will be compiled but not uploaded');
} else if ((config = JSON.parse(fs.readFileSync('./screeps.json'))[dest]) == null) {
  throw new Error('Invalid upload destination');
}

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
    sourcemap: true
  },

  plugins: [
    clear({ targets: ['dist'] }),
    resolve({ rootDir: 'src' }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    screeps({ config, dryRun: !config })
  ]
};
