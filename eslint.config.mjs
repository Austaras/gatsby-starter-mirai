// @ts-check

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from '@eslint-react/eslint-plugin'
import importX from 'eslint-plugin-import-x'

function getRules(config) {
  return config
    .map(c => c.rules)
    .filter(Boolean)
    .reduce((prev, curr) => Object.assign(prev, curr), {})
}

export default [
  {
    ignores: ['.cache/**/*.js']
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['.cache/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true
      },
      ecmaVersion: 10,
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@eslint-react': react.configs.recommended.plugins['@eslint-react'],
      '@eslint-react/dom': react.configs.recommended.plugins['@eslint-react/dom'],
      'import-x': importX
    },
    rules: {
      ...js.configs.recommended.rules,
      ...getRules(tseslint.configs.recommended),
      ...getRules(tseslint.configs.recommendedTypeChecked),
      ...react.configs.recommended.rules,
      ...importX.configs.warnings.rules,
      'arrow-body-style': ['warn', 'as-needed'],
      curly: ['warn', 'multi-line'],
      'dot-notation': 'warn',
      eqeqeq: 'warn',
      'max-len': [
        'warn',
        {
          code: 110
        }
      ],
      'no-console': 'off',
      'no-caller': 'warn',
      'no-eval': 'warn',
      'no-new-wrappers': 'warn',
      'no-throw-literal': 'warn',
      'no-var': 'warn',
      'no-undef-init': 'warn',
      'no-unused-expressions': 'warn',
      'object-shorthand': 'warn',
      radix: 'warn',
      'spaced-comment': 'warn',
      'valid-typeof': [
        'warn',
        {
          requireStringLiterals: true
        }
      ],
      'import-x/newline-after-import': 'warn',
      'import-x/order': [
        'warn',
        {
          groups: [
            ['internal', 'external', 'builtin'],
            ['index', 'sibling', 'parent']
          ],
          'newlines-between': 'always-and-inside-groups'
        }
      ],
      '@eslint-react/dom/no-dangerously-set-innerhtml': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public'
          }
        }
      ],
      '@typescript-eslint/func-call-spacing': ['warn', 'never'],
      '@typescript-eslint/member-delimiter-style': [
        'warn',
        {
          multiline: {
            delimiter: 'none',
            requireLast: false
          },
          singleline: {
            delimiter: 'comma',
            requireLast: false
          }
        }
      ],
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          classes: [
            'private-static-field',
            'protected-static-field',
            'public-static-method',
            'constructor',
            'protected-static-method',
            'private-static-method',
            'protected-static-method',
            'public-static-method',
            'private-instance-method',
            'protected-instance-method',
            'public-instance-method'
          ]
        }
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': [
        'warn',
        {
          allowSingleExtends: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-for-in-array': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/unified-signatures': 'warn'
    }
  }
]
