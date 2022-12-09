import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("erc721 kelvin token", () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  describe("Deployment", () => {
    it("can be deploy proxy", async () => {
      const contractFactory = await ethers.getContractFactory("KELVIN");
      console.log("Deploying erc721-kelvin Version 1...");

      const contract = await upgrades.deployProxy(contractFactory, {
        initializer: "initialize",
      });

      // Wait for this transaction to be mined
      await contract.deployed();

      // Get contract address
      console.log("Contract deployed to:", contract.address);
    });
    it("should be deployed with the right name", async () => {
      const MyContract = await ethers.getContractAt(
        "ERC721EnumerableUpgradeable",
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
      );
      expect(await MyContract.name()).equal("KELVIN");
    });
  });

  describe("functions", () => {
    it("can be mint", () => {});
    it("can be pause", () => {});
    it("can be burn", () => {});
  });
});
