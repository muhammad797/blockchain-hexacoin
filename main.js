const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }
 
    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor(){
        this.difficulty = 2;
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        const block = new Block("01/01/2020", "Genesis block", "0");
        block.mineBlock(this.difficulty);
        return block;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        block.previousHash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block);
    }

    isChainValid(){
        console.log("**** Verifying chain ****")
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            console.log({previousBlock, currentBlock })
            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.log('false | data changed | ', currentBlock.hash);
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                console.log('false | not match to previous | ', currentBlock.hash);
                return false;
            }
        }
        return true;
    }
}

const hexaCoin = new Blockchain();

console.log("Mining block 1...");
hexaCoin.addBlock(new Block("10/07/2020", {amount: 4}));

console.log("Mining block 2...");
hexaCoin.addBlock(new Block("10/07/2020", {amount: 38}));

console.log(JSON.stringify(hexaCoin, null, 4))

hexaCoin.chain[1].data = {amount: 100};
hexaCoin.chain[1].hash = hexaCoin.chain[1].calculateHash();
console.log(hexaCoin.isChainValid())