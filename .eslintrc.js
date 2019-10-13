module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "arrow-parens": 0,
    "import/imports-first": 0,
    "global-require": 0,
    "id-length": 0,
    "new-cap": 0,
    "func-names": 0,
    "no-param-reassign": 0,
    "generator-star-spacing": 0,
    "require-yield": 0,
    "import/prefer-default-export": 0,
    "no-console": 0,
    "function-paren-newline": 0,
    "prefer-destructuring": 0,
    "import/no-dynamic-require": 0,
    "no-buffer-constructor": 0,
    "no-shadow": 0,
    "no-await-in-loop": 0,
    "linebreak-style": [
      "error",
      (require("os").EOL === "\r\n" ? "windows" : "unix")
    ]
  },
};
