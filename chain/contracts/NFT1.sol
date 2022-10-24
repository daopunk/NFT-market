// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT1 is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _tokenIds;
  Counters.Counter private _tokensSold;

  address nftMarketContract;

  constructor(
    address _nftMarketContract,
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {
    nftMarketContract = _nftMarketContract;
  }

  function mintToken(string memory tokenURI) public returns (uint256) {
    _tokenIds.increment();
    uint256 newId = _tokenIds.current();
    _mint(msg.sender, newId);
    _setTokenURI(newId, tokenURI);
    setApprovalForAll(nftMarketContract, true);
    return newId;
  }

  function getTokenId() external view returns (uint256) {
    return _tokenIds.current();
  }
}
