const Block = require('./block');
const BlockChain = require('./blockchain');

let pesetaCoin = new BlockChain();

//Pruebas
console.log('Minando bloque 1...')
pesetaCoin.addBlock( new Block('03/05/2021', { amount: 50}));

console.log('Minando bloque 2...')
pesetaCoin.addBlock( new Block('03/07/2021', { amount: 20}));

console.log('Minando bloque 3...')
pesetaCoin.addBlock( new Block('01/08/2021', { amount: 85}));

// console.log(pesetaCoin.validateChain());
// console.log(JSON.stringify(pesetaCoin, null, 4));

// pesetaCoin.chain[1].data = {amount: 95};
// pesetaCoin.chain[1].hash = pesetaCoin.chain[1].calculateHash();

// console.log(pesetaCoin.validateChain());


console.log(JSON.stringify(pesetaCoin, null, 4));