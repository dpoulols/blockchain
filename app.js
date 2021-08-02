// Usamos metodo de encriptación  SHA256

const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(timestamp, data, previousHash = ''){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();

    }

    calculateHash(){  //Nos permitirá encriptar todos los datos del bloque
        return SHA256(this.timestamp, this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {

    constructor(){
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock(){
        return new Block( '02/08/2021', {name:'Genesis Block', proofDate: 'https://www.20minutos.es/noticia/4782485/0/horoscopo-lunes-02-agosto-2021/'}, '0'); // Primer bloque de mi blockchain
    }

    getLastBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let PacoCoin = new BlockChain();
PacoCoin.addBlock( new Block('03/05/2021', { amount: 50}));
PacoCoin.addBlock( new Block('03/07/2021', { amount: 20}));
PacoCoin.addBlock( new Block('01/08/2021', { amount: 85}));

console.log(JSON.stringify(PacoCoin, null, 4));