// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';

contract NftMarket2 is ReentrancyGuard {
  address payable owner;

  struct onSaleNFT {
    uint256 id;
    address payable vender;
    address payable owner;
    uint256 price;
    bool onSale;
  }

  mapping(address => uint256) public currStockByCollection;
  mapping(address => uint256) public maxStockByCollection;
  mapping(address => mapping(uint256 => onSaleNFT)) public onSaleNFTs;

  constructor() {
    owner = payable(msg.sender);
  }

  function getOnSaleNFT(address nftContract, uint256 tokenId)
    external
    view
    returns (onSaleNFT memory)
  {
    return onSaleNFTs[nftContract][tokenId];
  }

  function getStockByCollection(address nftContract)
    external
    view
    returns (uint256)
  {
    return currStockByCollection[nftContract];
  }

  function onERC721Received(
    address,
    address,
    uint256,
    bytes calldata
  ) external pure returns (bytes4) {
    return IERC721Receiver.onERC721Received.selector;
  }

  function createOnSaleNFT(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) external payable nonReentrant {
    require(price > 0, 'Price not set');

    onSaleNFTs[nftContract][tokenId] = onSaleNFT(
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      true
    );

    maxStockByCollection[nftContract] += 1;
    currStockByCollection[nftContract] += 1;

    IERC721(nftContract).safeTransferFrom(msg.sender, address(this), tokenId);
  }

  function buyOnSaleNFT(address nftContract, uint256 tokenId)
    external
    payable
    nonReentrant
  {
    onSaleNFT storage nft = onSaleNFTs[nftContract][tokenId];
    require(msg.value == nft.price, 'value must equal sell price');

    nft.vender.transfer(msg.value);
    nft.vender = payable(address(0));
    nft.owner = payable(msg.sender);
    nft.onSale = false;
    currStockByCollection[nftContract] -= 1;

    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
  }

  function fetchOnSaleNFTsByCollection(address nftContract)
    external
    view
    returns (onSaleNFT[] memory)
  {
    uint256 length = maxStockByCollection[nftContract];
    onSaleNFT[] memory _onSaleNFTs = new onSaleNFT[](
      currStockByCollection[nftContract]
    );

    uint256 j = 0;
    for (uint256 i = 0; i <= length; i++) {
      if (
        onSaleNFTs[nftContract][i].onSale == true &&
        onSaleNFTs[nftContract][i].owner == address(0)
      ) {
        _onSaleNFTs[j] = onSaleNFTs[nftContract][i];
        j++;
      }
    }
    return _onSaleNFTs;
  }

  function fetchUserNFTsByCollection(address nftContract)
    external
    view
    returns (onSaleNFT[] memory)
  {
    uint256 length = maxStockByCollection[nftContract];
    uint256 count = 0;
    for (uint256 i = 0; i <= length; i++) {
      if (onSaleNFTs[nftContract][i].owner == msg.sender) {
        count += 1;
      }
    }

    onSaleNFT[] memory userNFTs = new onSaleNFT[](count);

    uint256 j = 0;
    for (uint256 i = 0; i <= length; i++) {
      if (onSaleNFTs[nftContract][i].owner == msg.sender) {
        userNFTs[j] = onSaleNFTs[nftContract][i];
        j++;
      }
    }

    return userNFTs;
  }

  receive() external payable {}

  fallback() external payable {}
}
