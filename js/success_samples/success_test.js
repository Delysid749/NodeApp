const {Web3} = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');  // 确保与 Geth 节点的 HTTP RPC 端口一致
const fs = require('fs');
const contractABI = JSON.parse(fs.readFileSync('RentalContractABI.json', 'utf8'));


const contractAddress = '0xF1C46a41bf4eD6A9d91fee6A24768CAaa32849c4'; // 合约地址

const contract = new web3.eth.Contract(contractABI, contractAddress);

// 获取账户
web3.eth.getAccounts().then(accounts => {

	contract.methods.contractCounter().call().then(counter => {
		console.log(counter);
	})

    const account = accounts[0];

    // 调用合约方法
    contract.methods.createContract('0xF4A023B3D47D1D49a7DCC62DE5c24c886C53538b', 1000, 2000, '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 1609459200, 1640995200).send({ from: account })
        .then(receipt => {
            console.log('Transaction receipt:', receipt);

            // // 获取存储的值
            // contract.methods.get().call({ from: account })
            //     .then(value => {
            //         console.log('Stored value:', value);
            //     });
        });
});