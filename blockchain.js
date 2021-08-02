const Block = require('./block');

class BlockChain {

    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.miningDifficulty = 5;

    }

    createGenesisBlock(){
        return new Block( '02/08/2021', {name:'Genesis Block', proofDate: 'https://www.20minutos.es/noticia/4782485/0/horoscopo-lunes-02-agosto-2021'}, '0'); // Primer bloque de mi blockchain
    }

    getLastBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.miningDifficulty);
        this.chain.push(newBlock);
    }

    validateChain(){
        for( let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

module.exports = BlockChain;