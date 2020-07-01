module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      // Alias serve para o babel entender os paths q definimos no tsconfig.json
      alias: {
        "paths": {
          "@modules": "./src/modules",
          "@config": "./src/config",
          "@shared": "./src/shared",
        },
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ],
}
