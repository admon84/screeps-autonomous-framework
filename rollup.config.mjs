'use strict';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import path from 'path';
import del from 'rollup-plugin-delete';
import screeps from 'rollup-plugin-screeps-world';
import swc from 'rollup-plugin-swc3';
import { fileURLToPath } from 'url';

let config;
const { DEST } = process.env;
if (!DEST) {
  console.log('Compiling Screeps Autonomous Framework...');
} else if (!(config = JSON.parse(fs.readFileSync('./screeps.json'))[DEST])) {
  throw new Error(`Upload destination "${DEST}" not found in screeps.json`);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
        baseUrl: path.resolve(__dirname, 'src'),
        paths: {
          '*': ['*']
        }
      }
    }),
    screeps({ config, dryRun: !config })
  ]
};
