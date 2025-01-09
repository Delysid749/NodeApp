// 引入 Web3 库的默认导出
import Web3 from 'web3';
import { contractABI, contractAddress } from './config.js'
const web3 = new Web3('http://127.0.0.1:8545');

const contract = new web3.eth.Contract(contractABI, contractAddress);

//估计只会在geth下有用
export async function createAccount(password) {
    try {
        // 创建新账户
        const account = await web3.eth.personal.newAccount(password);
        console.log('New account created:', account);
        return account;
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
}

export async function transferEth(from, to, amountInEth) {
    try {
        // 将ETH数量转换为Wei
        const amountInWei = web3.utils.toWei(amountInEth.toString(), 'ether');

        // 发送ETH
        const txReceipt = await web3.eth.sendTransaction({
            from: from, // 发送方账户地址
            to: to, // 接收方账户地址
            gas: 21000, // 对于简单的ETH转账，21000 gas通常足够
            value: amountInWei // 发送的ETH数量（以Wei为单位）
        });

        console.log('Transaction receipt:', txReceipt);
        return txReceipt;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw error;
    }
}

export async function unlockMyAccount(usr_addr, password) {
    try {
      let res=await web3.eth.personal.unlockAccount(usr_addr, password, 600);
      return res;
    }catch (error) {
      console.error('Failed to unlock account:', error);
    }  
}

export async function createContract(account, password, tenant, rentAmount, depositAmount, ipfsHash, startTime, endTime) {
    try {
        // 准备交易参数
        const transactionParameters = {
            from: account,
            value: web3.utils.toWei('0', 'ether'),
            gas: 2000000,
        };
        // let res=await web3.eth.personal.unlockAccount(account, password, 600);
        // 调用合约的 createContract 方法
        const result = await contract.methods.createContract(
            tenant, rentAmount, depositAmount, ipfsHash, startTime, endTime
        ).send(transactionParameters);

        console.log('Contract created:', result);
        return result;
    } catch (error) {
        console.error('Error creating contract:', error);
        throw error;
    }
}

export async function signContract(account, contractId, etherNum) {
    try {
        if(!etherNum){etherNum = '0';}
        const transactionParameters = {
            from: account,
            value: web3.utils.toWei(etherNum, 'wei'),
            gas: 2000000,
        };
        const result = await contract.methods.signContract(contractId).send(transactionParameters);
        console.log('signed success:', result);
        return result;
    } catch (error) {
        console.error('Error signing contract:', error);
        throw error;
    }
}

export async function releaseDeposit(account, contractId) {
    try {
        const transactionParameters = {
            from: account,
            value: web3.utils.toWei('0', 'ether'),
            gas: 2000000,
        };
        const result = await contract.methods.releaseDeposit(contractId).send(transactionParameters);
        console.log('Contract released:', result);
        return result;
    } catch (error) {
        console.error('Error releasing contract:', error);
        throw error;
    }
}

export async function getContractNum() {
    try {
        const transactionParameters = {
            from: account,
            value: web3.utils.toWei('0', 'ether'),
            gas: 2000000,
        };
        const result = await contract.methods.contractCounter().call();
        console.log('The number of contracts:', result);
        return result;
    } catch (error) {
        console.error('', error);
        throw error;
    }
}

export async function getContractDetail(contractId) {
    try {
        const transactionParameters = {
            from: account,
            value: web3.utils.toWei('0', 'ether'),
            gas: 2000000,
        };
        const result = await contract.methods.contracts(contractId).send(transactionParameters);
        console.log('The detail of contracts:', result);
        return result;
    } catch (error) {
        console.error('Error querying contractId:', error);
        throw error;
    }
}

// export async function getContractDetail(contractId) {
//     try {
//         const transactionParameters = {
//             from: account,
//             value: web3.utils.toWei('0', 'ether'),
//             gas: 2000000,
//         };
//         const result = await contract.methods.contracts(contractId).send(transactionParameters);
//         console.log('The detail of contracts:', result);
//         return result;
//     } catch (error) {
//         console.error('Error querying contractId:', error);
//         throw error;
//     }
// }