const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readFileTalker = async () => {
    try {
        const readTalker = await fs.readFile(talkerPath);
        return JSON.parse(readTalker);       
    } catch (error) {
        console.log(`Arquivo não pode ser lido ${error}`);
    }
};

module.exports = readFileTalker;