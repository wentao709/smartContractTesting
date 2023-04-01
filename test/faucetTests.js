const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy();

    const withdrawAmount = ethers.utils.parseUnits('1', 'ether');

    const [owner] = await ethers.getSigners();

    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner, withdrawAmount };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    console.log(await faucet.owner());
    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should deploy and reverted', async function (){
    const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);
    expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  })

  it('should deploy and withdraw successfully', async function(){
    const {faucet} = await loadFixture(deployContractAndSetVariables);
    const amount = ethers.utils.parseUnits('0.01', 'ether');
    expect(faucet.withdraw())

  })


});