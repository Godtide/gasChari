
const hre = require("hardhat");

let NftId;
let picname = "stackshift";

 async function main(){
  / INITIALIZE / /////////////////////////////////////////////////////////
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
   const Stack = await hre.ethers.getContractFactory("ERC721MerkleDrop");
    let StackContract = await Stack.deploy(picname, "NFT");

  await StackContract.deployed();
console.log("tokenAddress:", StackContract.address);


  NftId = await StackContract.tokenCounter();
 console.log("NftId", NftId);

// the redeem() should be called in the mint Button
const result = await StackContract.redeem();

  // wait until the transaction is mined
await result.wait();
console.log(result.hash);




const NftUrl = await StackContract.imageURI();
 console.log("tokenUrl", NftUrl);



 NftId = await StackContract.tokenCounter();
 console.log("NftId", NftId)


}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
