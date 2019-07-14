module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "prettier",
        "plugin:jest/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    plugins: [
        "prettier",
        "jest"
    ],
    "rules": {
        "prettier/prettier": "error",
        "no-console": "off"
    }
};