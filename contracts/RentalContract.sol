// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./RentalNFT.sol";

contract RentalContract {
    struct Contract {
        address landlord; // 房东地址
        address tenant; // 租客地址
        uint256 rentAmount; // 月租金额
        uint256 depositAmount; // 押金金额
        bytes32 ipfsHash; // IPFS 哈希，存储合同详细信息
        bool landlordSigned; // 房东签署状态
        bool tenantSigned; // 租客签署状态
        bool isActive; // 合同是否生效
        uint256 startTime; // 合同开始时间
        uint256 endTime; // 合同结束时间
    }

    mapping(uint256 => Contract) public contracts;
    uint256 public contractCounter;

    event ContractCreated(
        uint256 indexed contractId,
        address indexed landlord,
        address indexed tenant
    );
    event ContractSigned(uint256 indexed contractId, address indexed signer);
    event DepositReleased(
        uint256 indexed contractId,
        address indexed to,
        uint256 amount
    );
    event Log(string value);

    RentalNFT public rentalNFT;

    constructor(address _rentalNFTAddress) {
        rentalNFT = RentalNFT(_rentalNFTAddress);
    }

    modifier onlyParticipants(uint256 contractId) {
        Contract storage rentalContract = contracts[contractId];
        require(
            msg.sender == rentalContract.landlord ||
                msg.sender == rentalContract.tenant,
            "Not authorized"
        );
        _;
    }

    function createContract(
        address tenant,
        uint256 rentAmount,
        uint256 depositAmount,
        bytes32 ipfsHash,
        uint256 startTime,
        uint256 endTime
    ) external returns (uint256) {
        require(tenant != address(0), "Invalid tenant address");
        require(startTime < endTime, "Invalid contract duration");

        contractCounter++;
        contracts[contractCounter] = Contract({
            landlord: msg.sender,
            tenant: tenant,
            rentAmount: rentAmount,
            depositAmount: depositAmount,
            ipfsHash: ipfsHash,
            landlordSigned: false,
            tenantSigned: false,
            isActive: false,
            startTime: startTime,
            endTime: endTime
        });

        emit ContractCreated(contractCounter, msg.sender, tenant);
        return contractCounter;
    }

    function signContract(
        uint256 contractId
    ) external payable onlyParticipants(contractId) {
        Contract storage rentalContract = contracts[contractId];
        require(!rentalContract.isActive, "Contract already active");

        if (msg.sender == rentalContract.landlord) {
            rentalContract.landlordSigned = true;
        } else if (msg.sender == rentalContract.tenant) {
            // 验证租户携带的金额是否符合要求
            require(
                rentalContract.landlordSigned,
                "Landlord should sign first"
            );
            uint256 requiredAmount = rentalContract.depositAmount +
                rentalContract.rentAmount;
            require(msg.value == requiredAmount, "Incorrect amount sent");

            rentalContract.tenantSigned = true;

            if (
                rentalContract.landlordSigned &&
                rentalContract.tenantSigned
            ) {
                rentalContract.isActive = true;
                payable(rentalContract.landlord).transfer(
                    rentalContract.rentAmount
                );
                // 构造NFT的元数据
                string memory metadata = string(
                    abi.encodePacked(
                        "Landlord: ",
                        toAsciiString(msg.sender),
                        ", Tenant: ",
                        toAsciiString(rentalContract.tenant),
                        ", Rent Amount: ",
                        uint2str(rentalContract.rentAmount),
                        ", Deposit Amount: ",
                        uint2str(rentalContract.depositAmount),
                        ", Start Time: ",
                        uint2str(rentalContract.startTime),
                        ", End Time: ",
                        uint2str(rentalContract.endTime)
                    )
                );

                // 铸造NFT
                rentalNFT.mintNFT(rentalContract.tenant, contractId, metadata);
            }
        }
        emit ContractSigned(contractId, msg.sender);
    }

    function releaseDeposit(uint256 contractId) external {
        Contract storage rentalContract = contracts[contractId];
        require(rentalContract.isActive, "Contract not active");
        require(
            msg.sender == rentalContract.landlord,
            "Only landlord can release deposit"
        );
        require(
            block.timestamp >= rentalContract.endTime,
            "Deposit can only be released after the contract end time"
        );

        rentalContract.landlordSigned = false;
        rentalContract.tenantSigned = false;
        rentalContract.isActive = false;

        payable(rentalContract.tenant).transfer(rentalContract.depositAmount);

        emit DepositReleased(
            contractId,
            rentalContract.tenant,
            rentalContract.depositAmount
        );
    }
    function uint2str(
        uint256 _i
    ) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = uint8(_i % 10);
            bstr[k] = bytes1(temp + 0x30);
            _i /= 10;
        }
        return string(bstr);
    }
    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2 ** (8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
    receive() external payable {} // 接收押金支付
}
