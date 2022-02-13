module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
		'@typescript-eslint',
    'react',
    'react-native',
    'prettier',
    'react-hooks'
	],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  'rules': {
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
  },
  // "parserOptions": {
  //     "ecmaFeatures": {
  //         "jsx": true
  //     },
  //     "project": "./tsconfig.json"
  // },
  "env": {
    "react-native/react-native": true
  },
};