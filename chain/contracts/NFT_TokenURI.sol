// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT_TokenURI is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _tokenIds;

  address nftMarketContract;

  event NftMinted(address minter, uint256 tokenId);

  constructor(
    address _nftMarketContract,
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {
    nftMarketContract = _nftMarketContract;
  }

  function mintToken(string memory tokenURI) public {
    uint256 newItemId = _tokenIds.current();
    emit NftMinted(msg.sender, newItemId);
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    setApprovalForAll(nftMarketContract, true);
    _tokenIds.increment();
  }

  function getTokenId() external view returns (uint256) {
    return _tokenIds.current();
  }
}
