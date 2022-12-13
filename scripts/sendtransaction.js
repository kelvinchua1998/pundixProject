const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const alchemy = new ethers.providers.JsonRpcProvider(
    process.env.ALCHEMY_API_URL
  );

  const gasPrice = await alchemy.getGasPrice();
  console.log("gasPrice", ethers.utils.formatEther(gasPrice), "eth");

  const kelvin = new ethers.Wallet(process.env.METAMASK_PRIVATE_KEY, alchemy);

  const elan = "0x2A76Ec22A0A2D16794Fb40db51BFF81212ACF4A5";

  const tx = {
    from: kelvin.address,
    to: elan,
    value: ethers.utils.parseUnits("0.001", "ether"),
    gasPrice: 30000000000,
    gasLimit: ethers.utils.hexlify(100000),
    nonce: 33,
  };

  const transaction = await kelvin.sendTransaction(tx);

  console.log(transaction);
}

main();
