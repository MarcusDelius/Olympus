// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ranking is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    bool public isActive;
    bool public claimed;

    string public game;

    uint256 public startTime;
    uint256 public endTime;

    address[] public players;
    mapping(address => uint256) public ranking;
    address public winner;

    address public immutable OLY = address(0);

    uint256 public prize;

    constructor(
        string memory _game,
        uint256 _startTime,
        uint256 _endTime
    ) {
        isActive = true;
        game = _game;
        startTime = _startTime;
        endTime = _endTime;
    }

    function registerPlayer(address _player) external onlyOwner {
        players.push(_player);
    }

    function updatePlayerPoints(address _player, uint256 _points)
        external
        onlyOwner
    {
        ranking[_player] = ranking[_player].add(_points);
    }

    function calcWinner() external onlyOwner {
        uint256 winnerPoints;
        for (uint256 i = 0; i < players.length; i++) {
            if (ranking[players[i]] > winnerPoints) {
                winnerPoints = ranking[players[i]];
                winner = players[i];
            }
        }
    }

    function claimPrize() external onlyOwner {
        require(!isActive);
        require(msg.sender == winner);
        require(!claimed);
        claimed = true;
        IERC20(OLY).safeTransfer(msg.sender, prize);
    }
}
