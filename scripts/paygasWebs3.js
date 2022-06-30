
import ERC721MerkleDrop from '../stackshift/artifacts/contracts/stackshiftNFT.sol/ERC721MerkleDrop.json';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');





let ERC721MerkleDropAddress;


const batchContract = new Web3.eth.Contract(
    ERC721MerkleDrop.abi,
    ERC721MerkleDropAddress,
  );



  /**
   * @deprecated
   * Approve hotwalletAddress to spend ERC20 tokens
   */
   function mintNFT(
    contract,
    hotwalletAddress,
    amount,
    userAddress,
    contractAddress,
  ) {
    const key =  this.keymanagementService.getPrivateKey(userAddress);
    const tx =  createTx(
     batchContract, //Contract to call to
      'create', //method name
      userAddress, //from
      contractAddress, //to
      [hotwalletAddress, amount],
    ); //params
    return this.signAndSendTransaction(tx, key.keyData.encryptedKey);
  }

mintNFT(batchContract, '0x0000000000000000000000000000000000000000', '1', '0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000');


  /**
   * Function to call a smart contract method
   */
   function createTx(
    contract,
    method,
    from,
    to,
    args,
  ) {
    const methodCall = contract['methods'][method];
    const gasPrice =  this.web3.eth.getGasPrice();
    const gas = methodCall(...args)
      .estimateGas({ from: from })
      .catch((e) => {
        throw Error(`Error calculating gas: ${e.message}`);
      });

    if (method === 'create') {
      this.sendEther(from, to, gas.mul(gasPrice)).catch((error) => {
        console.log('error sending Eth for approval', error);
      });
    }

    const nonce = this.web3.eth.getTransactionCount(from);

    const tx = {
      from,
      to,
      data: methodCall(...args).encodeABI(),
      gasLimit: gas.toString(),
      gasPrice: gasPrice.toString(),
      nonce: nonce.toString(),
      network: 'Eth',
    };

    return tx;
  }