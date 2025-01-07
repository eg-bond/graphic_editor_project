import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import newLineDest from 'eslint-plugin-newline-destructuring';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
      'newline-destructuring': newLineDest,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Indent ------------------------------------------------------------
      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],

      // Semicolons ---------------------------------------------------------
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-extra-semi': 'error',

      // Quotes -------------------------------------------------------------
      '@stylistic/quotes': [
        'error',
        'single',
        { allowTemplateLiterals: true },
      ],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],

      // Lines ---------------------------------------------------------------
      '@stylistic/max-len': [
        'warn',
        {
          code: 80,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
          ignoreRegExpLiterals: true,
        },
      ],
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      '@stylistic/eol-last': ['error', 'always'],

      // Line breaks ---------------------------------------------------------
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before',
          },
        },
      ],

      // String concatenation -------------------------------------------------
      'prefer-template': 'error',
      'no-multi-str': 'error',

      // Spacing --------------------------------------------------------------
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/comma-spacing': ['error', {
        before: false,
        after: true,
      }],
      '@stylistic/key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true,
        },
      ],
      '@stylistic/keyword-spacing': ['error', {
        before: true,
        after: true,
      }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      '@stylistic/block-spacing': 'error',
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/spaced-comment': ['warn', 'always'],
      '@stylistic/switch-colon-spacing': [
        'error',
        {
          after: true,
          before: false,
        },
      ],

      // Commas ---------------------------------------------------------------
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          enums: 'always-multiline',
          functions: 'never',
        },
      ],
      '@stylistic/comma-style': ['error', 'last'],

      // Objects -------------------------------------------------------------
      // Новая строка для {} объекта.
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            multiline: true,
            consistent: true,
          },
          ObjectPattern: {
            multiline: true,
            consistent: true,
          },
          ExportDeclaration: {
            multiline: true,
            consistent: true,
          },
          TSInterfaceBody: 'always',
          TSTypeLiteral: 'always',
        },
      ],
      // Новая строка для свойств объекта
      '@stylistic/object-property-newline': [
        'error',
        // !!!!!!!! Убрать??
        // {
        //   allowAllPropertiesOnSameLine: true,
        // },
      ],
      // Тоже что и object-property-newline но для деструктуризации
      'newline-destructuring/newline': 'error',

      // Typescript specific -------------------------------------------------
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
        multilineDetection: 'last-member',
      }],
      '@stylistic/type-annotation-spacing': [
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

      // Arrays ----------------------------------------------------------------
      // Новая строка для [] массива.
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      // Новая строка для элементов массива
      '@stylistic/array-element-newline': ['error', 'consistent'],

      // Other formatting ------------------------------------------------------
      '@stylistic/arrow-spacing': ['error', {
        before: true,
        after: true,
      }],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/padded-blocks': [
        'error',
        'never',
        { allowSingleLineBlocks: false },
      ],

      // @stylistic/no-extra-parens???
    },
  }
);
