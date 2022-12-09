# PUNDIX Project

This project utilises UUPS erc721 NFT and UUPS erc20 on the goerli test net.

to install all the required modules

```shell
npm install

cd ./pundix-app
npm install
```

create a .env file and store all the api keys as required

```
METAMASK_PRIVATE_KEY = <<METAMASK_PRIVATE_KEY>>
ETHERSCAN_API_KEY = <<ETHERSCAN_API_KEY>>
ALCHEMY_API_URL = <<ALCHEMY_API_URL>>
ALCHEMY_API_KEY = <<ALCHEMY_API_KEY>>
```

go back to root directory

1. npx hardhat clean
2. npx hardhat compile
3. npx hardhat run scripts/erc20_deploy_v1.ts
   once deployed, verify address on etherscan
4. npx hardhat run scripts/erc2721_deploy_v1.ts
   once deployed, verify address on etherscan
5. runn

```shell
npx hardhat verify --network goerli <address>
```

for both contract addresses

6. copy erc20Contract.json from artifacts\contracts\erc20-kelvin.sol and paste into pundix-app\src
7. copy KELVIN.json from artifacts\contracts\erc721-kelvin.sol\KELVIN.json and paste into pundix-app\src

cd ./pundix-app to go to application folder

```shell
npm start
```

to start app

---

proxy address on Goerli test network

erc 721 - 0xCCcCFb588b4c7D594CecC7AC80e918122997DB1a
erc 20 - 0x2A76Ec22A0A2D16794Fb40db51BFF81212ACF4A5

learning points

1. ensure high gas fee to not get nonce stuck
2. hardhat for testing and deployment
3. use alchemy fto deploy to goerli test network
