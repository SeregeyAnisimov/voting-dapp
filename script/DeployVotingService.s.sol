// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
// Правильный путь к вашему контракту
import {VotingService} from "../src/VotingService.sol";

contract DeployVotingService is Script {
    function run() external {
        vm.startBroadcast();

        new VotingService(
            unicode"Есть ли в вашей жизни цель?", // Используем unicode
            5
        );

        vm.stopBroadcast();
    }
}