module.exports = {
  parser: '@typescript-eslint/parser', // Define o parser do ESLint para TypeScript
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended' // Regras recomendadas do TypeScript
  ],
  parserOptions: {
    ecmaVersion: 2020, // Permite a análise de recursos modernos do ECMAScript
    sourceType: 'module'
  },
  rules: {
    // Suas regras personalizadas
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'object-curly-spacing': ['error', 'always']
  }
};
