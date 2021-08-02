const Block = require('./block');
const Transaction = require('./transactions');

class BlockChain {

    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.miningDifficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 10;

    }

    createGenesisBlock(){
        return new Block( '02/08/2021', {name:'Genesis Block', proofDate: 'https://www.20minutos.es/noticia/4782485/0/horoscopo-lunes-02-agosto-2021'}, '0'); // Primer bloque de mi blockchain
    }

    getLastBlock(){
        return this.chain[this.chain.length -1];
    }

    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLastBlock().hash;
    //     // newBlock.hash = newBlock.calculateHash();
    //     newBlock.mineBlock(this.miningDifficulty);
    //     this.chain.push(newBlock);
    // }

    addTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(minerAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.previousHash = this.getLastBlock().hash;
        block.mineBlock(this.miningDifficulty);
        console.log('Block successfully mined');
        this.chain.push(block);
        // console.log('Cadena: ', this.chain[1].transactions);
        this.pendingTransactions = [
            new Transaction(null, minerAddress, this.miningReward)
        ];
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for( const block of this.chain){
            console.log('Cadena: ', block.transactions);

            for( const trans of block.transactions){
                if (trans.fromAddress === address){
                    balance -= trans.fromAddress;
                }

                if (trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
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