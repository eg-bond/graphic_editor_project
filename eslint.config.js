import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic/js': stylisticJs,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Indent
      '@stylistic/js/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      // Semicolons
      '@stylistic/js/semi': ['error', 'always'],
      // Quotes
      '@stylistic/js/quotes': [
        'error',
        'single',
        { allowTemplateLiterals: true },
      ],
      // Lines
      '@stylistic/js/max-len': [
        'warn',
        {
          code: 80,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
          ignoreRegExpLiterals: true,
        },
      ],
      '@stylistic/js/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      '@stylistic/js/eol-last': ['error', 'always'],      
      // Line breaks
      '@stylistic/js/operator-linebreak': [
        'error',
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before',
          },
        },
      ],
      // String concatenation
      'prefer-template': 'error',
      'no-multi-str': 'error',
      // Spacing
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/template-curly-spacing': ['error', 'never'],
      '@stylistic/js/array-bracket-spacing': ['error', 'never'],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/key-spacing': [
        'error',
        { beforeColon: false, afterColon: true },
      ],
      '@stylistic/js/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/space-before-blocks': ['error', 'always'],
      '@stylistic/js/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/space-infix-ops': 'error',
      '@stylistic/js/spaced-comment': ['warn', 'always'],
      '@stylistic/js/switch-colon-spacing': [
        'error',
        { after: true, before: false },
      ],
    },
  }
);
