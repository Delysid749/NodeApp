const {Web3} = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');  // 确保与 Geth 节点的 HTTP RPC 端口一致

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = '0x51d86BF43D031324745Bb039497D6603Eb9D15df'; // 合约地址

const contract = new web3.eth.Contract(contractABI, contractAddress);

// 获取账户
web3.eth.getAccounts().then(accounts => {
    const account = accounts[0];

    // 调用合约方法
    contract.methods.set(10).send({ from: account })
        .then(receipt => {
            console.log('Transaction receipt:', receipt);

            // 获取存储的值
            contract.methods.get().call({ from: account })
                .then(value => {
                    console.log('Stored value:', value);
                });
        });
});