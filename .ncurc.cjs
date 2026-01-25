/**
 * @type {import('npm-check-updates').RunOptions}
 */
module.exports = {
    packageManager: 'pnpm',
    deep: true,

    // Exclude packages that are known to have issues when updating
    reject: [
        // it takes a while for the ecosystem to catch up to TS updates
        '@types/node'
    ]
};
