const Blockchain = require("./Blockchain");
const Transaction = require("./Transaction");

const hexaCoin = new Blockchain();

hexaCoin.createTransaction(new Transaction("address1", "address2", 30.50));
hexaCoin.createTransaction(new Transaction("address1", "address2", 299.00));
hexaCoin.createTransaction(new Transaction("address2", "address1", 23.50));

console.log("👷 <HexaTown>")
hexaCoin.minePendingTransactions("HexaTown")
console.log("balance of HexaTown is", hexaCoin.getBalanceOfAddress("HexaTown"))

hexaCoin.createTransaction(new Transaction("address2", "address1", 49.50));

console.log("👷 <LogicBulb>")
hexaCoin.minePendingTransactions("LogicBulb")
console.log("balance of HexaTown is", hexaCoin.getBalanceOfAddress("HexaTown"))

console.log("👷 <LogicBulb>")
hexaCoin.minePendingTransactions("LogicBulb")
console.log("balance of LogicBulb is", hexaCoin.getBalanceOfAddress("LogicBulb"))