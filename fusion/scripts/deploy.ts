import hre from "hardhat";

async function main() {
  const ethers = hre.ethers;
  const network = hre.network;

  console.log(`Deploying UniversalNFT to ${network.name}...`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  const ueaFactoryAddress = "0x00000000000000000000000000000000000000eA";

  const UniversalNFT = await ethers.getContractFactory("UniversalNFT");
  const contract = await UniversalNFT.deploy(ueaFactoryAddress);

  await contract.waitForDeployment();

  console.log(`✅ UniversalNFT deployed at: ${await contract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
































// import hre from "hardhat";

// async function main() {
//   const ethers = hre.ethers;
//   const network = hre.network;

//   console.log(`Deploying UniversalNFT to ${network.name}...`);

//   const [deployer] = await ethers.getSigners();
//   console.log(`Deployer address: ${deployer.address}`);

//   const ueaFactoryAddress = "0x00000000000000000000000000000000000000eA"; // replace this

//   const UniversalNFT = await ethers.getContractFactory("UniversalNFT");
//   const contract = await UniversalNFT.deploy(ueaFactoryAddress);

//   await contract.waitForDeployment();

//   console.log(`✅ UniversalNFT deployed at: ${await contract.getAddress()}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });



























// import { network, ethers } from "hardhat";

// async function main() {
//   console.log(`Deploying UniversalNFT to ${network.name}...`);

//   const [deployer] = await ethers.getSigners();
//   console.log(`Deployer address: ${deployer.address}`);

//   const ueaFactoryAddress = "0x00000000000000000000000000000000000000eA"; // replace with actual UEA Factory
//   const contractFactory = await ethers.getContractFactory("UniversalNFT");
//   const contract = await contractFactory.deploy(ueaFactoryAddress);

//   await contract.waitForDeployment();

//   const deployedAddress = await contract.getAddress();
//   console.log(`UniversalNFT deployed at: ${deployedAddress}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
