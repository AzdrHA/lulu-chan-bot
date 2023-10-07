module.exports = {
  env: {
    node: true,
    browser: false,
    commonjs: true,
    es2021: true
  },
  plugins: ['prettier'],
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json']
  },
  rules: {
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true
        }
      }
    ]
  }
};
