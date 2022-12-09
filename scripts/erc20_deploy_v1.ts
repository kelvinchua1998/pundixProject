import { ethers, upgrades } from "hardhat";

async function main() {
  const contractFactory = await ethers.getContractFactory("erc20Contract");
  console.log("Deploying erc20-kelvin Version 1...");

  const contract = await upgrades.deployProxy(contractFactory, {
    initializer: "initialize",
  });

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
