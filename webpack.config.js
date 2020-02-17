const path = require('path');
const WebpackUserscript = require('webpack-userscript');
const package = require('./package.json');

const dev = process.argv.includes('--dev');

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${package.name}.user.js`,
    //libraryTarget: 'this',
  },
  plugins: [
    new WebpackUserscript({
      headers: {
        name: 'OBS Hook - UnderScript Plugin',
        match: 'https://*.undercards.net/*',
        exclude: 'https://*.undercards.net/*/*',
        updateURL: `https://unpkg.com/${package.name}/dist/${package.name}.meta.js`,
        downloadURL: `https://unpkg.com/${package.name}/dist/${package.name}.user.js`,
        require: [
          'https://unpkg.com/obs-websocket-js@^4.x/dist/obs-websocket.min.js',
        ],
        grant: 'none',
      },
      pretty: true,
    }),
  ],
};
