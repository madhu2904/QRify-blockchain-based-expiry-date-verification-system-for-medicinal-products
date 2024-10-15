// const Medicine = artifacts.require("Medicine");

// module.exports = function(deployer) {
//   deployer.deploy(Medicine);
// };
// // const SimpleContract = artifacts.require("SimpleContract");

// // module.exports = function(deployer) {
// //   deployer.deploy(SimpleContract);
// // };
const SimpleContract = artifacts.require("SimpleContract");
const Medicine = artifacts.require("Medicine");

module.exports = function(deployer) {
    deployer.deploy(SimpleContract);
    deployer.deploy(Medicine);
};
