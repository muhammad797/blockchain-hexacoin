const Block = require('./Block')

class Blockchain {
    constructor(){
        this.difficulty = 3;
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        const block = new Block("Genesis block");
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
        if(this.chain.length === 1) return true;
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

module.exports = Blockchain