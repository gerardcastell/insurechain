import fse from 'fs-extra';
import { ethers } from 'hardhat';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther('100');

  const factory = await ethers.deployContract('Factory', [], {
    value: lockedAmount,
  });

  await factory.waitForDeployment();

  console.log(
    `Factory created with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${factory.target}`
  );

  const srcDir = `./artifacts/contracts`;
  const destDir = `./libs/web/blockchain/src/lib/contracts`;
  try {
    fse.copySync(srcDir, destDir, { overwrite: true });
    console.log('Contracts ABI copied successfully!');
  } catch (err) {
    console.error(err);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
