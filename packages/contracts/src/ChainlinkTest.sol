// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

// deployed on goerli --> 0x2c25ef37d7Bdc3fe6Bcb666ea74de94B513dACc8

contract ChainlinkTest is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    bytes32 private jobId;
    uint256 private fee;

    string public id;

    event RequestVolume(bytes32 indexed requestId, string volume);

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    function requestVolumeData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add(
            "get",
            "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/cuardiper?api_key=RGAPI-d9b23c0e-956e-44c6-bde8-08fb89de6e69"
        );

        req.add("path", "id");

        // Multiply the result by 1000000000000000000 to remove decimals
        //int256 timesAmount = 10**18;
        //req.addInt("times", timesAmount);

        return sendChainlinkRequest(req, fee);
    }

    function fulfill(bytes32 _requestId, string memory _id)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestVolume(_requestId, _id);
        id = _id;
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
