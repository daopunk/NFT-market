const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('NFT Market', function () {
  let deployer, users;
  let nftMarket, nft, addr;

  before(async () => {
    [deployer, u1, u2, u3, u4] = await ethers.getSigners();
    users = [u1.address, u2.address, u3.address, u4.address];

    const NftMarketContract = await ethers.getContractFactory('NftMarket');
    nftMarket = await NftMarketContract.connect(u4).deploy();
    await nftMarket.connect(u4).deployed();
    addr = nftMarket.address;

    const NftContract = await ethers.getContractFactory('NFT_SVG');
    nft = await NftContract.connect(u3).deploy(addr);
    await nft.connect(u3).deployed();

    console.log(`Contracts deployed at:\nMarket: ${addr}\nNFT: ${addr}`);
  });

  it('mint and creat sale', async () => {
    await nft.connect(deployer).mintFTR();
    await nftMarket
      .connect(deployer)
      .createOnSaleNFT(nft.address, 1, ethers.utils.parseEther('0.4'));
    expect(await nft.getTokenId()).to.equal(1);
    expect(await nftMarket.getStockByCollection(nft.address)).to.equal(1);
  });

  it('mint 5 tokens', async () => {
    for (let i = 0; i < 5; i++) {
      await nft.connect(deployer).mintFTR();
    }
    expect(await nft.getTokenId()).to.equal(6);
  });

  it('create 5 onSaleNFTs', async () => {
    for (let i = 0; i < 5; i++) {
      let id = 2 + i; // starting at current token id
      let num = ((5 + i) / 10).toFixed(2).toString();
      await nftMarket
        .connect(deployer)
        .createOnSaleNFT(nft.address, id, ethers.utils.parseEther(num));
      // const saleItem = await nftMarket.getOnSaleNFT(nft.address, id);
      // console.log(saleItem);
    }

    const listedNFTs = await nftMarket.fetchOnSaleNFTsByCollection(nft.address);
    // console.log(listedNFTs);
    for (let i = 1; i < listedNFTs.length; i++) {
      expect(listedNFTs.length).to.equal(6);
      expect(listedNFTs[i].vender).to.equal(deployer.address);
      expect(ethers.BigNumber.from(listedNFTs[i].owner)).to.equal(
        ethers.utils.hexZeroPad(0, 32)
      );
    }
  });

  it('return NFT', async () => {
    const saleItem = await nftMarket.getOnSaleNFT(nft.address, 3);
    expect(saleItem.price).to.equal(ethers.utils.parseEther('0.6'));
  });

  it('buy 1st onSaleNft', async () => {
    await nftMarket
      .connect(u1)
      .buyOnSaleNFT(nft.address, 3, { value: ethers.utils.parseEther('0.6') });
    const listedNFTs = await nftMarket.fetchOnSaleNFTsByCollection(nft.address);
    // console.log(listedNFTs);
    expect(listedNFTs.length).to.equal(5);
  });

  it('buy 2nd onSaleNft', async () => {
    await nftMarket
      .connect(u1)
      .buyOnSaleNFT(nft.address, 6, { value: ethers.utils.parseEther('0.9') });
    const listedNFTs = await nftMarket.fetchOnSaleNFTsByCollection(nft.address);
    expect(listedNFTs.length).to.equal(4);
  });

  it('buy 3rd onSaleNft', async () => {
    await nftMarket.connect(u1).buyOnSaleNFT(nft.address, 2, {
      value: ethers.utils.parseEther('0.5'),
    });
    const listedNFTs = await nftMarket.fetchOnSaleNFTsByCollection(nft.address);
    expect(listedNFTs.length).to.equal(3);
  });

  it('lookup user NFTs', async () => {
    const userNFTs = await nftMarket
      .connect(u1)
      .fetchUserNFTsByCollection(nft.address);

    expect(userNFTs[0].owner).to.equal(users[0]);
    expect(userNFTs[1].owner).to.equal(users[0]);
    expect(userNFTs[2].owner).to.equal(users[0]);
  });
});
