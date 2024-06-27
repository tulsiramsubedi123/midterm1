
function simulateBlockchain() {
    const outputElement = document.getElementById('simulation-output');
    outputElement.textContent = 'Starting blockchain simulation...\n';

    class Block {
        constructor(index, previousHash, timestamp, data, hash) {
            this.index = index;
            this.previousHash = previousHash;
            this.timestamp = timestamp;
            this.data = data;
            this.hash = hash;
        }
    }

    function calculateHash(index, previousHash, timestamp, data) {
        return `${index}${previousHash}${timestamp}${data}`.hashCode();
    }

    String.prototype.hashCode = function() {
        var hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; 
        }
        return hash;
    };

    function createGenesisBlock() {
        return new Block(0, "0", Date.now(), "Genesis Block", calculateHash(0, "0", Date.now(), "Genesis Block"));
    }

    function createNewBlock(previousBlock, data) {
        const index = previousBlock.index + 1;
        const timestamp = Date.now();
        const hash = calculateHash(index, previousBlock.hash, timestamp, data);
        return new Block(index, previousBlock.hash, timestamp, data, hash);
    }

    const blockchain = [createGenesisBlock()];
    for (let i = 1; i <= 5; i++) {
        blockchain.push(createNewBlock(blockchain[blockchain.length - 1], `Block #${i}`));
    }

    blockchain.forEach(block => {
        outputElement.textContent += `Block #${block.index} [Hash: ${block.hash}]\n`;
    });
}
