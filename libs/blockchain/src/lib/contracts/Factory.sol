// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Policy_v2.sol";


contract Factory {
  address payable insuranceAddress;
    uint256 minimumBudget = 0.999 ether;
    mapping(uint256 => address[]) policiesMapping;

    modifier companyOnly {
        require(msg.sender == insuranceAddress);
        _;
    }


   constructor() payable {
        require(msg.value >= minimumBudget, "Minimum budget is not achieved to start an Insurance Smart Contract" );
        insuranceAddress = payable(msg.sender);
    }

    function addBudget() companyOnly public payable returns (uint256){
        return address(this).balance;
    }

    function withdrawBudget(uint256 amount) companyOnly public returns (uint256){
        require(amount < address(this).balance, "There is not enough amount to withdraw");
        insuranceAddress.transfer(amount);
        return address(this).balance;
    }

    function createPolicy(uint policyholder, string memory riskObject, uint endDate) public payable returns (address){
        require(msg.value > 0, "To create a policy you must pay a premium.");
        Policy policyContract = new Policy(policyholder, riskObject, msg.value, msg.sender, endDate);
        address policyAddress = address(policyContract);
        uint holderId = policyholder;
        policiesMapping[holderId].push(policyAddress);
        return address(policyContract);
    }

    function getUserPolicies(uint userId) public view returns (address[] memory){
        address[] memory addresses = policiesMapping[userId];
        return addresses;
    }

    // Renews the policy and return the new end date.
    function renewPolicy(address policyAddress, uint daysToAdd, uint renewalAmount) public payable returns (uint){
        require(msg.value > renewalAmount, "To create a policy you must pay a premium.");
        Policy policyContract = Policy(policyAddress);
        require(msg.sender == policyContract.getOwnerAddress(), "Just the policyholder of the policy is able to renew it.");
        return policyContract.renew(daysToAdd);
    }
}

