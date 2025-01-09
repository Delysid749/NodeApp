import { Web3, HttpProvider } from 'web3';

var book_fee;
var recovery_fee;
var publish_fee;
export async function init_function(contract){
    book_fee =await getBookFee(contract);
    recovery_fee =await getRecoveryFee(contract);
    publish_fee =await getPublishFee(contract);
}

/**
 * 获取房源数量
 * @param {object} contract - 智能合约的实例
 */
export async function getPropertyCount(contract) {
  try {
    let count = await contract.methods.propertyCount().call();
    console.log('Property Count:', count);
  return count;

  } catch (error) {
    console.error('Failed to get property count:', error);
  }
}

/**
 * 获取时间锁定期限
 * @param {object} contract - 智能合约的实例
 */
export async function getTimeLock(contract) {
  try {
    let timeLock = await contract.methods.timeLock().call();
    console.log('Time Lock:', timeLock);
  return timeLock;

  } catch (error) {
    console.error('Failed to get time lock:', error);
  }
}

/**
 * 获取预订费用
 * @param {object} contract - 智能合约的实例
 */
export async function getBookFee(contract) {
  try {
    let fee = await contract.methods.book_fee().call();
    console.log('Book Fee:', fee);
  return fee;

  } catch (error) {
    console.error('Failed to get book fee:', error);
  }
}

/**
 * 获取维修费用
 * @param {object} contract - 智能合约的实例
 */
export async function getRecoveryFee(contract) {
  try {
    let fee = await contract.methods.recovery_fee().call();
    console.log('Recovery Fee:', fee);
  return fee;

  } catch (error) {
    console.error('Failed to get recovery fee:', error);
  }
}

/**
 * 获取发布费用
 * @param {object} contract - 智能合约的实例
 */
export async function getPublishFee(contract) {
  try {
    let fee = await contract.methods.publish_fee().call();
    console.log('Publish Fee:', fee);
  return fee;

  } catch (error) {
    console.error('Failed to get publish fee:', error);
  }
}

/**
 * 发布房源信息到智能合约
 * @param {string} contract - 智能合约
 * @param {string} addr - 房源地址
 * @param {number} area - 房源面积
 * @param {number} rent - 房源租金
 */
export async function publishProperty(contract, addr, area, rent,usr_addr) {

  try {
    // 发布房源信息的交易
    if (publish_fee == null) {
      publish_fee = await contract.methods.publish_fee().call();
    }
    const send_data = { 
      from:usr_addr , 
      value: 100,
    };
    console.log('send_data:',send_data);
    const transaction = await contract.methods.publishProperty(addr, area, rent).send(send_data);

    console.log('Transaction hash:', transaction.transactionHash);
    return transaction;
  } catch (error) {
    console.error('Failed to publish property:\n', error);
  }
}


/**
 * 房客支付押金和租金的功能函数
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 * @param {string} hashLock - 哈希锁
 * @param {string} usr_addr - 用户地址
 */
export async function rentProperty(contract, propertyId, hashLock,usr_addr) {
  try {
    // 计算总支付金额（租金 + 押金 + 维修费 + 预订费）
    const property = await contract.methods.properties(propertyId).call();
    const rent = property.rent;
    const deposit = property.deposit ;
    if (recovery_fee == null) {
      recovery_fee = await contract.methods.recovery_fee().call();
    }
    if (book_fee == null) {
      book_fee = await contract.methods.book_fee().call();
    }
    const totalPayment = rent + deposit + recovery_fee + book_fee;

    // 房客支付押金和租金的交易

    const transaction = await contract.methods.rentProperty(propertyId, hashLock).send({ 
      from: usr_addr, 
      value: totalPayment
    });
    return transaction;
    // console.log('Transaction hash:', transaction.transactionHash);
    // return transaction;
  } catch (error) {
    console.error('Failed to rent property:', error);
  }
}

/**
 * 房东解锁HTLC的功能函数
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 * @param {string} preimage - 原像
 */
export async function unlockHTLC(contract, propertyId, preimage) {
  try {
    // 房东解锁HTLC的交易
    const transaction = await contract.methods.unlockHTLC(propertyId, preimage);

    console.log('Transaction hash:', transaction.transactionHash);
    return transaction;
  } catch (error) {
    console.error('Failed to unlock HTLC:', error);
  }
}

/**
 * 房客申请退款HTLC合约中的资金
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 */
export async function refundHTLC(contract, propertyId) {
  try {
    // 房客申请退款的交易
    const transaction = await contract.methods.refundHTLC(propertyId);

    console.log('Transaction hash:', transaction.transactionHash);
    return transaction;
  } catch (error) {
    console.error('Failed to refund HTLC:', error);
  }
}

/**
 * 房客续租并支付下一期租金
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 */
export async function renewLease(contract, propertyId,usr_addr) {
  try {
    // 获取租金金额
    const rentalProperty = await contract.methods.properties(propertyId).call();
    const rent = rentalProperty.rent;

    // 续租的交易
    const transaction = await contract.methods.renewLease(propertyId).send({ 
      from: usr_addr, 
      value: rent, 
    });

    console.log('Transaction hash:', transaction.transactionHash);
    return transaction;
  } catch (error) {
    console.error('Failed to renew lease:', error);
  }
}

/**
 * 查询房源信息
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 */
export async function getProperty(contract, propertyId) {
  try {
    // 查询房源信息
    const property = await contract.methods.getProperty(propertyId).call();
    console.log('Property Details:', property);
    return property;
  } catch (error) {
    console.error('Failed to get property:', error);
  }
}
// 哈希256加密算法
export async function hash256(data) {
  // 将输入转换为ArrayBuffer
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  // 使用SubtleCrypto API生成SHA-256哈希
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

  // 将ArrayBuffer转换为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  // hashHex = Web3.utils.toHex(hashHex);
  hashHex = '0x' + hashHex;

  return hashHex;
}

// export async function getAllProperties(contract) {
//   try {
//     let properties = await contract.methods.getAllProperties();
//     return properties;
//   } catch (error) {
//     console.error('Failed to get all properties:', error);
//   }
// }

export async function getAllProperties(contract) {
  try {
    let propertie_count = await getPropertyCount(contract);
    let properties = [];
    for (let i = 1; i <= propertie_count; i++) {
      let property = getProperty(contract, i);
      properties.push(property);
    }
    return properties;
  } catch (error) {
    console.error('Failed to get all properties:', error);
  }
}



export { book_fee, recovery_fee,publish_fee };
