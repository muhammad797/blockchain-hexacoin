const Blockchain = require("./Blockchain");
const Transaction = require("./Transaction");

const hexaCoin = new Blockchain();

hexaCoin.createTransaction(new Transaction("ADDRESS_01", "ADDRESS_02", 30.50));
hexaCoin.createTransaction(new Transaction("ADDRESS_01", "ADDRESS_02", 299.00));
hexaCoin.createTransaction(new Transaction("ADDRESS_02", "ADDRESS_01", 23.50));

console.log("\n<HexaTown>")
hexaCoin.minePendingTransactions("HexaTown")
console.log("Balance of <HexaTown> is", hexaCoin.getBalanceOfAddress("HexaTown"))

hexaCoin.createTransaction(new Transaction("address2", "address1", 49.50));

console.log("\n<LogicBulb>")
hexaCoin.minePendingTransactions("LogicBulb")
console.log("Balance of <HexaTown> is", hexaCoin.getBalanceOfAddress("HexaTown"))

console.log("\n<LogicBulb>")
hexaCoin.minePendingTransactions("LogicBulb")
console.log("Balance of <LogicBulb> is", hexaCoin.getBalanceOfAddress("LogicBulb"))