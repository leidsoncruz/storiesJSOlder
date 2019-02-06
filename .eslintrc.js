module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "plugins": ["jest"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true
    }
  },
  "extends": ["eslint:recommended", "plugin:jest/recommended"],
  "rules": {
    "quotes": [ 1, "single" ],
    "keyword-spacing": 1,
    "space-before-function-paren": [1, "never"],
    "sort-imports": [1, {}],
    "indent": [1, 2],
    "curly": [1, "all"],
    "brace-style": [1, "1tbs", { "allowSingleLine": false }],
    "space-before-blocks": [1, "always"],
    "arrow-parens": [1, "as-needed"],
    "space-infix-ops": 1,
    "strict": [1, "never"],
    "max-statements-per-line": [2, { "max": 1 }],
    // "no-console": 2,
    "semi": 2,
    "no-extra-semi": 2,
    "no-unused-vars": [2, { "args": "after-used" }]
  },
  "globals": {}
};
