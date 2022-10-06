// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract CiferpnxNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  address nftMarketContract;

  constructor(address _nftMarketContract) ERC721('Ciferpnx', 'CPX') {
    nftMarketContract = _nftMarketContract;
  }

  function mintToken(string memory tokenURI) public returns (uint256) {
    _tokenIds.increment();
    uint256 newId = _tokenIds.current();
    _mint(nftMarketContract, newId);
    _setTokenURI(newId, tokenURI);
    setApprovalForAll(nftMarketContract, true);
    return newId;
  }
}