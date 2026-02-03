import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
  formatters: {
    prettier: true,
  },

  typescript: {
    tsconfigPath: './tsconfig.json',
  },

  rules: {
    'react/react-in-jsx-scope': 'off',
    curly: ['error', 'all'],
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/semi': 'off',
    semi: 'off',
    'style/semi': 'off',
    'style/quote-props': 'off',
  },

  ignores: ['**/dist', '**/node_modules', '*.md', '*.json'],
});
