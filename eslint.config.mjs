import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...sveltePlugin.configs['flat/recommended'],
  ...astroPlugin.configs.recommended,
  prettier,
  {
    ignores: ['dist/', '.astro/']
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        requestAnimationFrame: 'readonly',
        console: 'readonly',
        atob: 'readonly'
      }
    }
  },
  {
    rules: {
      'no-var': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'svelte/no-at-html-tags': 'off',
      'svelte/valid-compile': ['error', { ignoreWarnings: false }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'svelte/no-navigation-without-resolve': 'off'
    }
  }
];
