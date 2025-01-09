# v1（无仲裁版本）

## 如何运行

默认已配置geth环境变量
1.运行start.bat启动geth
2.将contracts文件夹的合约复制进remix里
3.先部署RentalNFT.sol，然后将部署好的RentalNFT.sol的合约地址复制，在部署RentalContract.sol时粘贴进去，然后部署RentalContract.sol
4.在项目根目录下执行npm install
5.示例代码在test_connect.js里，按下述逻辑分次运行即可

## 目前的合约逻辑

1.私有链持有者创建合同(createContract)
2.房东先签名(signContract)
3.租客签名并支付租金押金，同时进行合约的NFT铸造(signContract)
4.合约过期后，允许房东进行释放押金操作
