import screeps from '@admon-dev/rollup-plugin-screeps';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import typescript from 'rollup-plugin-typescript2';

const dest = process.env.DEST;
if (dest) {
  console.log(`🚀 Uploading screeps bot to ${dest}...`);
} else {
  console.log(`📦 Building screeps bot...`);
}

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/main.ts',
  output: { dir: 'dist', format: 'cjs', sourcemap: true },
  plugins: [
    del({ targets: 'dist/*' }),
    resolve({ rootDir: 'src' }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    screeps({ config: './screeps.json', destination: dest })
  ]
};
