var Campaign = artifacts.require("../contracts/Campaign.sol");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Campaign);
};
