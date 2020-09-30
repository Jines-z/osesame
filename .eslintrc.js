module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project        : 'tsconfig.json',
        tsconfigRootDir: './',
        sourceType     : 'module',
        ecmaVersion    : 2019,
        ecmaFeatures   : {
            jsx: true
        }
    },
    env: {
        browser : true,
        commonjs: true,
        es6     : true
    },
    globals: {
        window    : true,
        document  : true,
        __ENV__   : true,
        __BRANCH__: true,
        IPC       : true
    },
    extends: [
        'standard',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    plugins: [
        'standard',
        'react-hooks',
        '@typescript-eslint'
    ],
    settings: {
        'import/resolver': {
            'node': {
                'extensions': [
                    '.js',
                    '.jsx'
                ]
            }
        },
        'react': {
            'version': 'detect'
        }
    },
    rules: {
        'indent'                            : ['error', 4, { 'SwitchCase': 1 }],
        'eqeqeq'                            : 'off',
        'camelcase'                         : 'off',
        'no-extra-boolean-cast'             : 'off',
        'padded-blocks'                     : 'off',
        'eol-last'                          : 'off',
        'no-useless-escape'                 : 'off',
        'no-useless-constructor'            : 'off',
        'spaced-comment'                    : 'off',
        'semi'                              : ['error', 'never'],
        'arrow-parens'                      : ['error', 'as-needed'],
        'no-multiple-empty-lines'           : ['error', { 'max': 1 }],
        'space-before-function-paren'       : ['error', 'never'],
        'no-trailing-spaces'                : ['error', { 'skipBlankLines': true }],
        'prefer-promise-reject-errors'      : ['error', { 'allowEmptyReject': true }],
        'jsx-quotes'                        : ['error', 'prefer-single'],
        'no-unreachable'                    : process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger'                       : process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console'                        : process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'react/prop-types'                  : 'off',
        'react/no-array-index-key'          : 'off',
        'react/jsx-closing-bracket-location': 'error',
        'react/self-closing-comp'           : ['error', { 'component': true, 'html': false }],
        'react/jsx-tag-spacing'             : ['error', { 'beforeSelfClosing': 'always' }],
        'react-hooks/rules-of-hooks'        : 'error',
        'react-hooks/exhaustive-deps'       : 'off',
        '@typescript-eslint/ban-ts-ignore'                : 'off',
        '@typescript-eslint/interface-name-prefix'        : 'off',
        '@typescript-eslint/no-explicit-any'              : 'off',
        '@typescript-eslint/camelcase'                    : 'off',
        '@typescript-eslint/explicit-function-return-type': 'error'
    }
}
