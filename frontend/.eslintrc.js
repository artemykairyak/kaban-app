module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Prettier errors as ESLint errors. Make sure this is the last configuration in the extends array.
  ],

  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'jsx-a11y'],

  rules: {
    'array-callback-return': 'error', // Enforces return statements in callbacks of array’s methods.
    'no-case-declarations': 'error', // Disallow lexical declarations in case/default clauses.
    'no-eq-null': 'error', // Disallow null comparisons.
    'no-floating-decimal': 'error', // Disallow floating decimals.
    'no-redeclare': 'error', // Disallow variable redeclaration.
    'for-direction': 'error', // Enforce “for” loop update clause moving the counter in the right direction.
    'getter-return': 'error', // Enforce return statements in getters.
    'no-compare-neg-zero': 'error', // Disallow comparing against -0.
    'no-cond-assign': 'error', // Disallow assignment operators in conditional expressions.
    'no-constant-condition': 'warn', // Disallow constant expressions in conditions.
    'no-debugger': 'warn', // Disallow the use of debugger.
    'no-dupe-args': 'error', // Disallow duplicate arguments in function definitions.
    'no-dupe-keys': 'error', // Disallow duplicate keys in object literals.
    'no-duplicate-case': 'error', // Disallow duplicate case labels.
    'no-extra-boolean-cast': 'warn', // Disallow unnecessary boolean casts.
    'no-extra-semi': 'error', // Disallow unnecessary semicolons.
    'no-invalid-regexp': 'error', // Disallow invalid regular expression strings in RegExp constructors.
    'no-obj-calls': 'error', // Disallow calling global object properties as functions.
    'no-regex-spaces': 'error', // Disallow multiple spaces in regular expression literals.
    'no-sparse-arrays': 'error', // Disallow sparse arrays.
    'no-unexpected-multiline': 'error', // Disallow confusing multiline expressions.
    'no-unsafe-negation': 'error', // Disallow negating the left operand of relational operators.
    'use-isnan': 'error', // Require calls to isNaN() when checking for NaN.
    'valid-typeof': 'error', // Enforce comparing typeof expressions against valid strings.

    // @typescript-eslint
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: false }],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/prefer-function-type': 2,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    // react
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],

    // react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // import
    'import/no-cycle': [2, { maxDepth: 1 }],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/no-unresolved': 'off',
    'import/named': 'warn',

    // jsx-a11y
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
  },
};
