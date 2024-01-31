module.exports = {
    arrowParens: 'avoid',
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    printWidth: 80,
    trailingComma: 'all',
    importOrder: [
        '<THIRD_PARTY_MODULES>',
        '^[./]',
        '^@/(.*)$',
        '^@/types/(.*)$',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ['typescript', 'decorators-legacy'],
    plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
    overrides: [
        {
            files: '*.yaml',
            options: {
                tadWidth: 2,
                printWidth: 40,
                singleQuote: true,
            },
        },
    ],
};
