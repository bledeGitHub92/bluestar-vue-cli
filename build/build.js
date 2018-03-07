const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config/index');
const clientConfig = require('./webpack.client');
const serverConfig = require('./webpack.server');
const copyTemplate = require('./copy-template');

const spinner = ora('building for production...');
spinner.start();

if (typeof config.build.assetsSubDir !== 'string' || config.build.assetsSubDir === '') {
  console.log('');
  console.log('');
  console.log(chalk.red('  file: app_root/config/index.js -> config.build.assetsSubDir can not be empty.  '))
  console.log('');
  process.exit(1);
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDir), err => {
  if (err) throw err;

  Promise.all([build(clientConfig), build(serverConfig)])
    .then(stats => {
      spinner.stop();
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
      });

      copyTemplate();

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ));
    }).catch(err => {
      throw err;
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