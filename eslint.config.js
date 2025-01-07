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
    extends: [
      stylistic.configs.customize({
        // the following options are the default values
        indent: 2,
        quotes: 'single',
        semi: true,
        jsx: true,
        blockSpacing: true,
        braceStyle: '1tbs',
        commaDangle: 'always-multiline',
        quoteProps: 'consistent-as-needed',
      }),
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
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
      // Semicolons -----------------------------------------------------
      '@stylistic/no-extra-semi': 'error',
      // Lines ----------------------------------------------------------
      '@stylistic/max-len': [
        'warn',
        {
          code: 80,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
          ignoreRegExpLiterals: true,
        },
      ],
      // Line breaks ----------------------------------------------------
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
      // Spacing ---------------------------------------------------------
      '@stylistic/switch-colon-spacing': [
        'error',
        {
          after: true,
          before: false,
        },
      ],
      // Objects ---------------------------------------------------------
      // Новая строка для {} объекта.
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, consistent: true },
          ObjectPattern: { multiline: true, consistent: true },
          ExportDeclaration: { multiline: true, consistent: true },
          ImportDeclaration: { multiline: true, consistent: true },
          TSInterfaceBody: 'always',
          TSTypeLiteral: 'always',
        },
      ],
      // Новая строка для свойств объекта
      '@stylistic/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
      // Тоже что и object-property-newline но для деструктуризации (плагин)
      'newline-destructuring/newline': 'error',

      // Arrays ----------------------------------------------------------------
      // Новая строка для [] массива.
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      // Новая строка для элементов массива
      '@stylistic/array-element-newline': ['error', 'consistent'],
    },
  },
);
