// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Arbitration {
    enum Decision { Pending, LandlordWins, TenantWins }

    struct Dispute {
        uint256 contractId;
        address initiator;
        string reason;
        Decision decision;
        bool isResolved;
        address[] arbitrators;
        mapping(address => Decision) votes;
        uint256 totalVotes;
        uint256 landlordVotes;
        uint256 tenantVotes;
    }

    mapping(uint256 => Dispute) public disputes;
    uint256 public disputeCounter;

    event DisputeOpened(uint256 indexed disputeId, uint256 indexed contractId, address indexed initiator);
    event DisputeResolved(uint256 indexed disputeId, Decision decision);

    modifier onlyUnresolved(uint256 disputeId) {
        require(!disputes[disputeId].isResolved, "Dispute already resolved");
        _;
    }

    function openDispute(uint256 contractId, string memory reason) external returns (uint256) {
        disputeCounter++;
        Dispute storage newDispute = disputes[disputeCounter];
        newDispute.contractId = contractId;
        newDispute.initiator = msg.sender;
        newDispute.reason = reason;
        newDispute.decision = Decision.Pending;
        newDispute.isResolved = false;
        newDispute.arbitrators = new address[](0); // 初始化为空数组
        newDispute.totalVotes = 0;
        newDispute.landlordVotes = 0;
        newDispute.tenantVotes = 0;

        emit DisputeOpened(disputeCounter, contractId, msg.sender);
        return disputeCounter;
    }
    //示例输入：1: vote for landlord, 2: vote for tenant
    function voteOnDispute(uint256 disputeId, Decision decision) external onlyUnresolved(disputeId) {
        Dispute storage dispute = disputes[disputeId];
        require(dispute.votes[msg.sender] == Decision.Pending, "Already voted");
        require(decision == 1 || decision == 2, "1: vote for landlord, 2: vote for tenant");

        dispute.votes[msg.sender] = decision;
        dispute.totalVotes++;

        if (decision == Decision.LandlordWins) {
            dispute.landlordVotes++;
        } else if (decision == Decision.TenantWins) {
            dispute.tenantVotes++;
        }

        if (dispute.totalVotes >= 3) { // Minimum votes required to resolve
            resolveDispute(disputeId);
        }
    }

    function resolveDispute(uint256 disputeId) internal {
        Dispute storage dispute = disputes[disputeId];
        require(!dispute.isResolved, "Dispute already resolved");

        if (dispute.landlordVotes > dispute.tenantVotes) {
            dispute.decision = Decision.LandlordWins;
        } else if (dispute.tenantVotes > dispute.landlordVotes) {
            dispute.decision = Decision.TenantWins;
        } else {
            dispute.decision = Decision.Pending; // Tie case, require manual resolution
        }

        dispute.isResolved = true;

        emit DisputeResolved(disputeId, dispute.decision);
    }
}
