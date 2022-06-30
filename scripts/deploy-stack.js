
const hre = require("hardhat");

let NftId;
let picname = "stackshift";

 async function main(){
  / INITIALIZE / /////////////////////////////////////////////////////////
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
   const Stack = await hre.ethers.getContractFactory("ERC721MerkleDrop");
    let StackContract = await Stack.deploy(picname, "NFT", "0x3c7d1972af943d68e17d52f8af2baab3769fd7febe2e6f026a3034512a988c1f");

  await StackContract.deployed();
console.log("tokenAddress:", StackContract.address);


  NftId = await StackContract.tokenCounter();
 console.log("NftId", NftId);

// the redeem() should be called in the mint Button
const result = await StackContract.redeem(deployer.address, [
  '0x8ca45dc9087e35af4a2d7355f228e3f90a6d48a04d10cce57f14af645546110c'
] );

  // wait until the transaction is mined
await result.wait();
console.log(result);




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
