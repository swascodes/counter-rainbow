// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 public counter;

    event CounterIncremented(address indexed user, uint256 newValue);
    event CounterDecremented(address indexed user, uint256 newValue);

    function increment() external {
        counter += 1;
        emit CounterIncremented(msg.sender, counter);
    }

    function decrement() external {
        require(counter > 0, "Counter cannot be negative");
        counter -= 1;
        emit CounterDecremented(msg.sender, counter);
    }

    function getCounter() external view returns (uint256) {
        return counter;
    }
}
