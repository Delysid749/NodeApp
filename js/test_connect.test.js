import { createContract, signContract } from './RentalContract.js';
// 使用 const 关键字定义不可变的变量
const tenant = '0xF4A023B3D47D1D49a7DCC62DE5c24c886C53538b'; // 租户地址
const landlord = '0xF4A023B3D47D1D49a7DCC62DE5c24c886C53538b'; // 房东地址
const rentAmount = 1000; // 租金金额
const depositAmount = 2000; // 押金金额
const ipfsHash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'; // IPFS 哈希值
const startTime = 1609459200; // 开始时间（Unix 时间戳）
const endTime = 1640995200; // 结束时间（Unix 时间戳）

// createContract(tenant, rentAmount, depositAmount, ipfsHash, startTime, endTime);
// signContract(tenant, 1)
signContract(landlord, 1, '3000')

