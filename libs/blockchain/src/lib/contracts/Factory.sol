// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Policy_v2.sol";


contract Factory {
    address insuranceAddress;
    uint256 minimumBudget = 0.999 ether;
    mapping(uint256 => address[]) policiesMapping;


   constructor() payable {
        require(msg.value >= minimumBudget, "Minimum budget is not achieved to start an Insurance Smart Contract" );
        insuranceAddress = msg.sender;
    }

    modifier onlyCompany {
        require(msg.sender == insuranceAddress);
        _;
    }

    function addBuget() onlyCompany public payable returns (uint256){
        return address(this).balance;
    }

    function createPolicy(uint policyHolder, string memory riskObject) public payable returns (address){
        require(msg.value > 0, "To create a policy you must pay a premium.");
        Policy policyContract = new Policy(policyHolder, riskObject, msg.value, msg.sender);
        address policyAddress = address(policyContract);
        uint holderId = policyHolder;
        policiesMapping[holderId].push(policyAddress);
        return address(policyContract);
    }

    function getUserPolicies(uint userId) public view returns (address[] memory){
        address[] memory addresses = policiesMapping[userId];
        return addresses;
    }


}
