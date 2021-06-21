module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/essential',
    'eslint-config-airbnb-base/rules/best-practices.js',
    'eslint-config-airbnb-base/rules/errors.js',
    'eslint-config-airbnb-base/rules/es6.js',
    'eslint-config-airbnb-base/rules/imports.js',
    'eslint-config-airbnb-base/rules/node.js',
    'eslint-config-airbnb-base/rules/strict.js',
    'eslint-config-airbnb-base/rules/style.js',
    'eslint-config-airbnb-base/rules/variables.js',
  ],
  plugins: [
    'vue',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', __dirname],
          ['@', __dirname],
        ],
        extensions: ['.vue'],
      },
    },
  },
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'linebreak-style': 'off',
    'max-len': ['warn', { code: 175 }],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'acc', 'e'] }],
  },
};
