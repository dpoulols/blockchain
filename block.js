// Usamos metodo de encriptación  SHA256

const SHA256 = require('crypto-js/sha256');
const Transaction = require('./transactions');

class Block {

    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0; // Al minar un bloque podremos cambiar este valor y recalcular el hash
        this.hash = this.calculateHash();

    }

    calculateHash(){  //Nos permitirá encriptar todos los datos del bloque
        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(miningDifficulty){
        while(this.hash.substring(0, miningDifficulty) !== Array(miningDifficulty+1).join('0')){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Mined Block: ', this.hash);
    }
}

module.exports = Block;