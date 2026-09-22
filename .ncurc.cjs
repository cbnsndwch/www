/**
 * @type {import('npm-check-updates').RunOptions}
 */
module.exports = {
    packageManager: 'pnpm',
    deep: true,

    // Exclude packages that are known to have issues when updating
    reject: [
        // it takes a while for the ecosystem to catch up to TS updates
        '@types/node',

        // TypeScript 7 is the native port and too young for this to be a
        // drive-by upgrade
        'typescript'
    ]
};
