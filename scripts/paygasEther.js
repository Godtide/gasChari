
const hre = require("hardhat");

let NftId;
let picname = "stackshift";


//  const Stack =  hre.ethers.getContractFactory("ERC721MerkleDrop");

 async function main(){
  / INITIALIZE / /////////////////////////////////////////////////////////
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  mintNFT(deployer.address);
}

async function sendEther(amount, addressTo){
const account_from = {
    privateKey: 'YOUR-PRIVATE-KEY-HERE',
  };
  let wallet = new hre.ethers.Wallet(account_from.privateKey);
  
    console.log(`Attempting to send transaction from ${wallet.address} to ${addressTo}`);
    const tx = {
      to: addressTo,
      value: hre.ethers.utils.parseEther(amount),
    };
    const createReceipt = await wallet.sendTransaction(tx);
    await createReceipt.wait();
  }
  

async function mintNFT(to){
    // use deployed contract to instantiate class
const stack = await hre.ethers.getContractFactory("ERC721MerkleDrop");
    const gasPrice = hre.signer.getGasPrice( ) 
    const nonce = hre.signer.getTransactionCount( ["latest"] ) 

    const overrides = { nonce, gasPrice }
   const gas = await stack.estimateGas.create( [ overrides ] );
       sendEther(to, gas * gasPrice).catch((error) => {
           throw Error(`Error sending Eth for minting: ${error.message}`);  
   } )
    console.log(`Gas estimate: ${gas}`);

// add missing arguments to call ethers write function
  const createReceipt = await stack.create();
  await createReceipt.wait();
}





// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


