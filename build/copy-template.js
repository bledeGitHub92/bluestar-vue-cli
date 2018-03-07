const fs = require('fs');
const path = require('path');
const config = require('../config/index');

const filename = 'index.html';
const templatePath = path.join(__dirname, '../src', filename);
const dist = path.join(config.build.assetsRoot, filename);

const read = fs.createReadStream(templatePath);
const write = fs.createWriteStream(dist);

read.pipe(write);

console.log('');
console.log('\033[36m' + filename + '\033[39m' + ' has copyed.')