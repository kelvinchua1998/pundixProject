import { ethers, upgrades } from "hardhat";

async function main() {
  const contractV2 = await ethers.getContractFactory("erc20Contract");
  const upgraded = await upgrades.upgradeProxy(
    "0x2A76Ec22A0A2D16794Fb40db51BFF81212ACF4A5",
    contractV2
  );

  console.log("Contract upgraded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
