const path = require('path');
const fs = require('fs');
const solc = require('solc');

const smartContractPath = path.resolve(
  __dirname,
  '..',
  'contracts',
  'Policy.sol'
);
const source = fs.readFileSync(smartContractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Policy.sol': {
      content: source,
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
  'Policy.sol'
].Policy;

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
console.log(output);
module.exports = output;
