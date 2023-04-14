const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const writeFile = (newAsset) => fs.writeFile(talkerPath, JSON.stringify(newAsset));

module.exports = writeFile;