# PUNDIX Project

This project utilises UUPS erc721 NFT and UUPS erc20 on the goerli test net.

to install all the required modules

```shell
npm i
```

create a .env file and store all the api keys as required

1. npx hardhat clean
2. npx hardhat compile
3. npx hardhat run scripts/erc20_deploy_v1.ts
   once deployed, verify
4. npx hardhat verify --network goerli <address>
   verify contract on etherscan

proxy address

erc 721 - 0xCCcCFb588b4c7D594CecC7AC80e918122997DB1a
erc 20 - 0x2A76Ec22A0A2D16794Fb40db51BFF81212ACF4A5

learning points

1. ensure high gas fee to not get nonce stuck
2. hardhat for testing and deployment
3. use alchemy fto deploy to goerli test network
