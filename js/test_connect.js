import { createContract, releaseDeposit, signContract, unlockMyAccount } from './RentalContract.js';
// import { createAccount, transferEth } from './RentalContract.js';

const firstAccount = '0xF4A023B3D47D1D49a7DCC62DE5c24c886C53538b'; //初始账户
const tenant = '0x8430718a1b37bd7b7a0403b5429369a6ceff64fe'; // 租户地址
const landlord = '0x8be51db24717229f209a57b16c86c2eb634389dd'; // 房东地址
const password = '123456'; // 所有账户的密码
const rentAmount = 1000; // 租金金额
const depositAmount = 2000; // 押金金额
const ipfsHash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'; // IPFS 哈希值
const startTime = 1609459200; // 开始时间（Unix 时间戳）
const endTime = 1640995200; // 结束时间（Unix 时间戳）

// unlockMyAccount(landlord, password);
// createContract(landlord, password, tenant, rentAmount, depositAmount, ipfsHash, startTime, endTime);
// await unlockMyAccount(landlord, password);
// signContract(landlord, 1);
// unlockMyAccount(tenant, password);
// signContract(tenant, 1, '3000');
releaseDeposit(landlord, 1);

// // 创建账户
// createAccount('123456');
// transferEth(firstAccount, tenant, 10000);
// transferEth(firstAccount, landlord, 1000);
// createContract(account1, account2, rentAmount, depositAmount, ipfsHash, startTime, endTime);
// signContract(account1, 3);
// signContract(account2, 3, '3000');