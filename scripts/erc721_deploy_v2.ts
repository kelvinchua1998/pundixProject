import { ethers, upgrades } from "hardhat";

async function main() {
  const contractV2 = await ethers.getContractFactory("KELVIN");
  const upgraded = await upgrades.upgradeProxy(
    "0xCCcCFb588b4c7D594CecC7AC80e918122997DB1a",
    contractV2
  );

  console.log("Contract upgraded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
