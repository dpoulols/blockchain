// Usamos metodo de encriptación  SHA256

const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(timestamp, data, previousHash = ''){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.joker = 0; // Al minar un bloque podremos cambiar este valor y recalcular el hash
        this.hash = this.calculateHash();

    }

    calculateHash(){  //Nos permitirá encriptar todos los datos del bloque
        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.data) + this.joker).toString();
    }

    mineBlock(miningDifficulty){
        while(this.hash.substring(0, miningDifficulty) !== Array(miningDifficulty+1).join('0')){
            this.joker++;
            this.hash = this.calculateHash();
        }
        console.log('Mined Block: ', this.hash);
    }
}

module.exports = Block;