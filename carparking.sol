// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ParkingPayment {
    address public owner;
    uint256 public parkingFee = 0.01 ether;

    event PaymentSuccess(
        address indexed payer,
        string licensePlate,
        uint256 amount
    );

    constructor() {
        owner = msg.sender;
    }

    function payParking(string memory _licensePlate) public payable {
        require(msg.value >= parkingFee, "Insufficient payment");
        payable(owner).transfer(msg.value);
        emit PaymentSuccess(msg.sender, _licensePlate, msg.value);
    }

    function setParkingFee(uint256 _fee) public {
        require(msg.sender == owner, "Only owner can set fee");
        parkingFee = _fee;
    }

    function getParkingFee() public view returns (uint256) {
        return parkingFee;
    }
}
