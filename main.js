const Block = require("./Block");
const Blockchain = require("./Blockchain");

const hexaCoin = new Blockchain();
hexaCoin.addBlock(new Block({amount: 5.99}), Date.now());
hexaCoin.addBlock(new Block({amount: 38.30}), Date.now());
hexaCoin.addBlock(new Block({amount: 3.53}), Date.now());

console.log("\n----- ORIGINAL BLOCKCHAIN ------\n")
console.log(JSON.stringify(hexaCoin, null, 4))

console.log("\n----- MAKING CHANGES ------\n")
hexaCoin.chain[1].data = {amount: 100};
hexaCoin.chain[1].hash = hexaCoin.chain[1].calculateHash();

console.log("\n----- Is Chain Valid?", hexaCoin.isChainValid(), "-----\n")