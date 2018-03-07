const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config/index');
const clientConfig = require('./webpack.client');
const serverConfig = require('./webpack.server');

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err;

  Promise.all(build(clientConfig), build(serverConfig))
    .then((stats) => {
      stats.forEach(stat => {
        process.stdout.write(stat.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false
        }) + '\n\n')

        if (stat.hasErrors()) {
          console.log(chalk.red('  Build failed with errors.\n'))
          process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ));
      })
    }).catch(reason => {
      throw reason;
    });

});

function build(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  })
}