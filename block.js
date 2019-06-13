const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash =''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';

    }
    getHash(){
        return SHA256(`${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}`).toString();

    }
}
class Blockchain{
    constructor(){
        this.chain = [this.genesisBlock()];
    }
    genesisBlock(){
        return new Block(1, '0128075677', 'Genesis Block', 0)
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.getHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i = 1; i< this.chain.length; i ++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];
            if(currentBlock.hash !== currentBlock.getHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let driveCoin = new Blockchain();
driveCoin.addBlock(new Block(2, '11/06/2019', {name: 'Hameed', country:'Nigeria', latitude: '12N', longitude:'120S', distance: '10km', amount: 10000, }));
console.log(driveCoin);
console.log('Is blockchain valid? '+driveCoin.isChainValid());