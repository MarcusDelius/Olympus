pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OlympusToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Olympus", "OLY") {
        _mint(msg.sender, initialSupply);
    }
}
