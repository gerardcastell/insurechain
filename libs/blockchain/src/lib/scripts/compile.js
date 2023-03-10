const path = require('path');
const fs = require('fs');
const solc = require('solc');

const fileNames = ['Farmer', 'Policy_v2'];

const input = {
  language: 'Solidity',
  sources: fileNames.reduce((acc, fileName) => {
    const filePath = path.resolve(
      __dirname,
      '..',
      'contracts',
      `${fileName}.sol`
    );
    const source = fs.readFileSync(filePath, 'utf8');
    return { ...acc, [fileName + '.sol']: { content: source } };
  }, {}),
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = output;
