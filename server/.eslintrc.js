module.exports = {
  settings: {
    'import/resolver': {
      alias: [['@root', '.']],
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/javascript',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    semi: 'off',
    complexity: ['error', 20],
    'max-statements': ['error', 35],
    'max-depth': ['error', 3],
    'max-lines-per-function': ['error', 100],
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'no-trailing-spaces': 0,
    'operator-linebreak': 0,
    'max-len': ['error', { code: 120 }],
    'comma-dangle': 0,
    // Warn if return statements do not either always or never specify values
    'consistent-return': 0,
    'no-use-before-define': 0,
    'linebreak-style': 0,
  },
}
