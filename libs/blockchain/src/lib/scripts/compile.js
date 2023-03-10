const path = require('path');
const fs = require('fs');
const solc = require('solc');

const fileNames = ['Farmer', 'Policy_v2'];

const smartContractPath = path.resolve(
  __dirname,
  '..',
  'contracts',
  'Farmer.sol'
);
const source = fs.readFileSync(smartContractPath, 'utf8');
const source2 = fs.readFileSync(
  path.resolve(__dirname, '..', 'contracts', 'Policy_v2.sol'),
  'utf8'
);
const input = {
  language: 'Solidity',
  sources: {
    'Farmer.sol': {
      content: source,
    },
    'Policy_v2.sol': {
      content: source2,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Farmer.sol'
].Farmer;

// const createStream = fs.createWriteStream(
//   path.resolve(__dirname, '..', 'Policy.json')
// );
// createStream.write(JSON.stringify(output));
// createStream.end();

// fs.writeFile(
//   path.resolve(__dirname, '..', 'Policy.json'),
//   JSON.stringify(output),
//   (err) => {
//     if (err) {
//       console.error(err);
//     }
//   }
// );
module.exports = output;
