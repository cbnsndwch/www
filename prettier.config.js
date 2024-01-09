/** @type {import('prettier').Options} */
module.exports = {
    singleQuote: true,
    useTabs: false,
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    endOfLine: 'lf',
    plugins: ['prettier-plugin-tailwindcss'],
};
