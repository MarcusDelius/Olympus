// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract RankingFactory {
    mapping(uint256 => address) public games;

    constructor() {}

    function mint(uint256 numToBeMinted) external {}
}
