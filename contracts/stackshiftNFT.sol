//  SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/GSN/GSNRecipient.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";
import "hardhat/console.sol";

contract ERC721MerkleDrop is ERC721URIStorage, GSNRecipient  {
    string public imageURI;
    uint256 public tokenCounter;
    uint256 public pastBlockTime;
    uint256 public deadline;

    event CreatedStack(uint256 indexed tokenId);


    constructor(string memory name, string memory symbol)
    ERC721(name, symbol)
    {
        tokenCounter = 1;
        pastBlockTime = block.timestamp;
        deadline = pastBlockTime + 2 weeks;
    }

    function redeem() external fortnight
    {
        create( tokenCounter);
    }


    modifier fortnight() {
        require(block.timestamp != pastBlockTime, "only 1 transaction per block"); 
        require(block.timestamp <= deadline, "two week grace period has expired");
        _;
    }



    function create(uint256 tokenId) internal {

        _safeMint(_msgSender(), tokenId);
       console.log("msg.sender balance", msg.sender.balance);

       console.log("tokenId", tokenCounter);

        imageURI = baseTokenURI();

        console.log("imageURI", imageURI);

        _setTokenURI(tokenCounter, formatTokenURI(imageURI));
        tokenCounter += 1;
        emit CreatedStack(tokenCounter);
    }

    
  function baseTokenURI() public pure returns (string memory) {
    return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/QmTWQabE7Sa4rr4g7Qg6WCKLK5YJtWeYDLJS2yNxE97gFw"));
  }


    function formatTokenURI(string memory URI) public pure returns (string memory) {
        return string(
                abi.encodePacked(
                                '{"name":"',
                                "Stackshift NFT",
                                '", "description":"An in-memory Picture NFT script!", "attributes":"", "image":"',URI,'"}'
                            )
                        );
    }

}