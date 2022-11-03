// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import {Base64} from './lib/Base64.sol';

contract NFT_SVG is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  address nftMarketContract;

  string baseSvg =
    "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  string[] cityWord = [
    'Los Angeles ',
    'Mexico City ',
    'Medellin ',
    'Barcelona ',
    'Miami ',
    'Buenos Aires ',
    'London '
  ];
  string[] jobWord = [
    'Freelancer ',
    'DAOist ',
    'Anarchist ',
    'Corporate Suit ',
    'Founder ',
    'Intellectual ',
    'Dropout '
  ];
  string[] socialWord = [
    'Public Good',
    'Private Interest',
    'Collective Sovereignty',
    'Neoliberal Individualism',
    'Ecological Entropy',
    'Orwellian Dystopia',
    'Crypto Democracy'
  ];

  event NftMinted(address minter, uint256 tokenId);

  constructor(address _nftMarketContract) ERC721('Futuro', 'FTR') {
    nftMarketContract = _nftMarketContract;
  }

  function pickRandomCityWord(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked('FIRST_WORD', Strings.toString(tokenId)))
    );
    rand = rand % cityWord.length;
    return cityWord[rand];
  }

  function pickRandomJobWord(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked('SECOND_WORD', Strings.toString(tokenId)))
    );
    rand = rand % jobWord.length;
    return jobWord[rand];
  }

  function pickRandomSocialWord(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked('THIRD_WORD', Strings.toString(tokenId)))
    );
    rand = rand % socialWord.length;
    return socialWord[rand];
  }

  function random(string memory input) internal pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(input)));
  }

  function mintFTR() public {
    _tokenIds.increment();
    uint256 newTokenId = _tokenIds.current();
    string memory city = pickRandomCityWord(newTokenId);
    string memory job = pickRandomJobWord(newTokenId);
    string memory social = pickRandomSocialWord(newTokenId);
    string memory combinedWord = string(abi.encodePacked(city, job, social));

    string memory finalSvg = string(
      abi.encodePacked(baseSvg, combinedWord, '</text></svg>')
    );

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',
            combinedWord,
            '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
            Base64.encode(bytes(finalSvg)),
            '"}'
          )
        )
      )
    );

    string memory finalTokenUri = string(
      abi.encodePacked('data:application/json;base64,', json)
    );

    emit NftMinted(msg.sender, newTokenId);

    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, finalTokenUri);
    setApprovalForAll(nftMarketContract, true);
  }

  function getTokenId() external view returns (uint256) {
    return _tokenIds.current();
  }
}
