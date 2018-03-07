const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const config = require('../config/index');

const filename = 'index.html';
const templatePath = path.join(__dirname, '../src', filename);
const dist = path.join(config.build.assetsRoot, filename);

function copyTemplate() {
  const read = fs.createReadStream(templatePath);
  const write = fs.createWriteStream(dist);
  
  read.pipe(write);
  
  console.log(chalk.cyan('  index.html has copyed.\n'));
}

module.exports = copyTemplate;