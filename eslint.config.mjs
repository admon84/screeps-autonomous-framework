import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2018,
      parser: typescriptEslintParser,
      parserOptions: { project: 'tsconfig.json', tsconfigRootDir: './', sourceType: 'module' },
      globals: { es6: true, node: true }
    },
    plugins: { '@typescript-eslint': typescriptEslintPlugin, import: importPlugin, prettier: prettierPlugin },
    rules: {
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/no-shadow': ['error', { hoist: 'all' }],
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      camelcase: 'error',
      eqeqeq: ['error', 'smart'],
      'id-denylist': ['error', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean', 'Undefined'],
      'id-match': 'error',
      'max-classes-per-file': ['error', 1],
      'no-caller': 'error',
      'no-eval': 'error',
      'no-new-wrappers': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'no-var': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      radix: 'error',
      'spaced-comment': 'error'
    }
  }
];
