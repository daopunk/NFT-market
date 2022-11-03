// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

interface IERC721 {
  function transferFrom(
    address from,
    address to,
    uint256 tokenId
  ) external;
}

contract NftMarket1 is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter public _tokenIds;
  Counters.Counter private _tokensSold;

  address payable owner;

  struct onSaleNFT {
    uint256 id;
    address nftContract;
    uint256 tokenId;
    address payable vender;
    address payable owner;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => onSaleNFT) private onSaleNFTs;

  constructor() {
    owner = payable(msg.sender);
  }

  function createOnSaleNFT(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) external payable nonReentrant {
    require(price > 0, 'Price not set');
    uint256 id = _tokenIds.current();

    onSaleNFTs[id] = onSaleNFT(
      id,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      false
    );

    _tokenIds.increment();
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
  }

  function buyOnSaleNFT(address nftContract, uint256 id)
    external
    payable
    nonReentrant
  {
    uint256 price = onSaleNFTs[id].price;
    uint256 tokenId = onSaleNFTs[id].tokenId;
    require(msg.value == price, 'value must equal sell price');

    onSaleNFTs[id].vender.transfer(msg.value);
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

    onSaleNFTs[id].owner = payable(msg.sender);
    onSaleNFTs[id].sold = true;
    _tokensSold.increment();
  }

  function fetchOnSaleNFTs() external view returns (onSaleNFT[] memory) {
    uint256 total = _tokenIds.current();
    uint256 onSaleCount = total - _tokensSold.current();
    onSaleNFT[] memory _onSaleNFTs = new onSaleNFT[](onSaleCount);

    for (uint256 i = 0; i < total; i++) {
      if (onSaleNFTs[i].owner == address(0)) {
        onSaleNFT storage _onSaleNFT = onSaleNFTs[i];
        _onSaleNFTs[i] = _onSaleNFT;
      }
    }
    return _onSaleNFTs;
  }

  function fetchUserNFTs() external view returns (onSaleNFT[] memory) {
    uint256 total = _tokenIds.current();
    uint256 count = 0;

    console.log(total);

    for (uint256 i = 0; i < total; i++) {
      if (onSaleNFTs[i].owner == msg.sender) {
        count += 1;
      }
    }

    console.log(count);

    onSaleNFT[] memory userNFTs = new onSaleNFT[](count);

    for (uint256 i = 0; i < total; i++) {
      if (onSaleNFTs[i].owner == msg.sender) {
        uint256 id = onSaleNFTs[i].id;
        onSaleNFT storage _onSaleNFT = onSaleNFTs[id];
        userNFTs[i] = _onSaleNFT;
      }
    }
    return userNFTs;
  }
}
