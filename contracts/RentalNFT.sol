// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RentalNFT is ERC721{
    uint256 public tokenCounter;
    mapping(uint256 => string) private tokenMetadata;

    constructor() ERC721("RentalNFT", "RNFT") {
        tokenCounter = 0;
    }

    function mintNFT(
        address recipient,
        uint256 contractId,
        string memory metadata
    ) external returns (uint256) {
        tokenCounter++;
        _mint(recipient, tokenCounter);
        tokenMetadata[tokenCounter] = metadata;
        return tokenCounter;
    }

    function transferNFT(uint256 tokenId, address to) external {
        address owner = ownerOf(tokenId);
        require(_isAuthorized(owner, msg.sender, tokenId), "Not authorized");
        _transfer(owner, to, tokenId);
    }

    function getMetadata(uint256 tokenId) external view returns (string memory) {
        return tokenMetadata[tokenId];
    }
}
