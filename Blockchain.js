const Block = require("./Block");
const Transaction = require("./Transaction");

class Blockchain {
  constructor() {
    this.difficulty = 2;
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    const block = new Block("Genesis block");
    block.mineBlock(this.difficulty);
    return block;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(this.pendingTransactions, Date.now())
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block in this.chain){
      console.log('block:', block.transactions ? block.transactions.length : '-')
      for(const trans in block.transactions) {
        console.log(trans)
          if(trans.fromAddress === address) {
            balance -= trans.amount;
          }
          if(trans.toAddress === address) {
            balance += trans.amount;
          }
      }
    }
    return balance;
  }

  isChainValid() {
    if (this.chain.length === 1) return true;
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      console.log({ previousBlock, currentBlock });
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log("false | data changed | ", currentBlock.hash);
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log("false | not match to previous | ", currentBlock.hash);
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
