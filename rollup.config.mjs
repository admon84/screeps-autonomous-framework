'use strict';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import del from 'rollup-plugin-delete';
import screeps from 'rollup-plugin-screeps-world';
import swc from 'rollup-plugin-swc3';

let config;
const { DEST } = process.env;
if (!DEST) {
  console.log('Compiling Screeps Autonomous Framework...');
} else if (!(config = JSON.parse(fs.readFileSync('./screeps.json'))[DEST])) {
  throw new Error(`Upload destination "${DEST}" not found in screeps.json`);
}

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    del({ targets: 'dist/*' }),
    resolve({ rootDir: 'src' }),
    commonjs(),
    swc({
      sourceMaps: true,
      jsc: {
        baseUrl: 'src',
        paths: {
          '*': ['*']
        }
      }
    }),
    screeps({ config, dryRun: !config })
  ]
};
