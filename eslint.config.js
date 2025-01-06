import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts'

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
      '@stylistic/ts': stylisticTs
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Indent
      '@stylistic/ts/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      // Semicolons
      '@stylistic/ts/semi': ['error', 'always'],
      '@stylistic/ts/no-extra-semi': 'error',
      // Quotes
      '@stylistic/ts/quotes': [
        'error',
        'single',
        { allowTemplateLiterals: true },
      ],
      '@stylistic/ts/quote-props': ['error', 'consistent-as-needed'],
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
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/ts/key-spacing': [
        'error',
        { beforeColon: false, afterColon: true },
      ],
      '@stylistic/ts/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/ts/space-before-blocks': ['error', 'always'],
      '@stylistic/ts/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      '@stylistic/ts/block-spacing': 'error',
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/ts/space-infix-ops': 'error',
      '@stylistic/js/spaced-comment': ['warn', 'always'],
      '@stylistic/js/switch-colon-spacing': [
        'error',
        { after: true, before: false },
      ],
      // Commas
      '@stylistic/ts/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      '@stylistic/js/comma-style': ['error', 'last'],

      // Objects
      // Новая строка для {} объекта.
      '@stylistic/ts/object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, consistent: true },
          ObjectPattern: { multiline: true, consistent: true },
          ExportDeclaration: { multiline: true, consistent: true },
          TSInterfaceBody: { multiline: true },
          TSTypeLiteral: { multiline: true }
        },
      ],
      // Новая строка для свойств объекта
      '@stylistic/ts/object-property-newline': [
        'error',
        // !!!!!!!! Убрать??
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
      // Types
      '@stylistic/ts/member-delimiter-style': ['error', {
        'multiline': {
          'delimiter': 'comma',
          'requireLast': true
        },
        'singleline': {
          'delimiter': 'comma',
          'requireLast': false
        },
        'multilineDetection': 'last-member'
      }],      
      '@stylistic/ts/type-annotation-spacing': [
        'error',
        {
          before: false,
          after: true,
          overrides: {
            arrow: {
              before: true,
              after: true,
            },
            colon: {
              before: false,
              after: true,
            },
          },
        },
      ],
      // Arrays
      // Новая строка для [] массива.
      '@stylistic/js/array-bracket-newline': ['error', 'consistent'],
      // Новая строка для элементов массива
      '@stylistic/js/array-element-newline': ['error', 'consistent'],

      // Other formatting
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],      
      '@stylistic/ts/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/padded-blocks': ['error', 'never', { allowSingleLineBlocks: false }],

      // @stylistic/ts/no-extra-parens???
    },
  }
);
