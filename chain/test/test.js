const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('NFT Market', function () {
  let deployer, users;

  before(async () => {
    [deployer, u1, u2, u3, u4] = await ethers.getSigners();
    users = [u1.address, u2.address, u3.address, u4.address];

    const NftMarketContract = await ethers.getContractFactory('NftMarket');
    this.nftMarket = await NftMarketContract.deploy();
    await this.nftMarket.deployed();

    const NftContract = await ethers.getContractFactory('NFT');
    this.nft = await NftContract.deploy(
      this.nftMarket.address,
      'CipherPunx',
      'CPX'
    );
    await this.nft.deployed();

    console.log(
      `Contracts deployed at:\nMarket: ${this.nftMarket.address}\nNFT: ${this.nft.address}`
    );
  });

  it('mint 5 tokens', async () => {
    for (let i = 0; i < 5; i++) {
      await this.nft.mintToken(`https-ipfs-t${i}`);
    }
    expect(await this.nft.getTokenId()).to.equal(5);
  });

  it('create 5 onSaleNFTs', async () => {
    const auctionPrice = ethers.utils.parseUnits('100', 'ether');

    for (let i = 0; i < 5; i++) {
      await this.nftMarket.createOnSaleNFT(
        this.nft.address,
        i + 1,
        auctionPrice
      );
    }
    const listedNFTs = await this.nftMarket.fetchOnSaleNFTs();
    for (let i = 0; i < listedNFTs.length; i++) {
      expect(listedNFTs[i].vender).to.equal(deployer.address);
      expect(ethers.BigNumber.from(listedNFTs[i].owner)).to.equal(
        ethers.utils.hexZeroPad(0, 32)
      );
    }
  });

  it('buy 1 onSaleNft', async () => {
    const options = { value: ethers.utils.parseEther('100.0') };
    await this.nftMarket.connect(u1).buyOnSaleNFT(this.nft.address, 4, options);
    const userNFTs = await this.nftMarket.connect(u1).fetchUserNFTs();
    expect(userNFTs[0].owner).to.equal(users[0]);
  });
});
