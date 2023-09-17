// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./Policy.sol";


contract Factory {
  address payable insuranceAddress;
    uint256 minimumBudget = 0.999 ether;
    mapping(uint256 => address[]) policiesMapping;
    mapping(address => bool) private claimEvaluators;

    constructor() payable {
        require(msg.value >= minimumBudget, "Minimum budget is not achieved to start an Insurance Smart Contract");
        insuranceAddress = payable(msg.sender);
    }


    modifier companyOnly {
        require(msg.sender == insuranceAddress, "Just the insurance company can perform this action");
        _;
    }

     modifier claimEvaluatorsOnly {
        require(msg.sender == insuranceAddress || isClaimEvaluatorKnown(msg.sender), "Required a valid evaluator approved by the company");
        _;
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
        return policyAddress;
    }

    function getUserPolicies(uint userId) public view returns (address[] memory){
        address[] memory addresses = policiesMapping[userId];
        return addresses;
    }

    // Renews the policy and return the new end date.
    function renewPolicy(address policyAddress, uint newEndDate, uint renewalAmount) public payable returns (uint){
        require(msg.value > renewalAmount, "To renew a policy you must pay a premium.");
        Policy policyContract = Policy(policyAddress);
        require(msg.sender == policyContract.getOwnerAddress(), "Just the policyholder of the policy is able to renew it.");
        return policyContract.renew(newEndDate);
    }


    function approveClaim(address policyAddress ,uint256 claimId , uint256 claimExpenses) claimEvaluatorsOnly public {
        require(claimExpenses < address(this).balance, "Insufficient balance to pay the claim.");

        Policy policy = Policy(policyAddress);
        policy.approveClaim(claimId, claimExpenses);

        address payable holderAddress = payable(policy.getOwnerAddress());
        holderAddress.transfer(claimExpenses);
    }

    function declineClaim(address policyAddress, uint256 claimId) claimEvaluatorsOnly public {
        Policy policy = Policy(policyAddress);
        policy.declineClaim(claimId);
    }

    function addEvaluator(address newAddress) companyOnly public {
        claimEvaluators[newAddress] = true;
    }

    function changeEvaluatorValue(address evaluator, bool value) companyOnly public {
        claimEvaluators[evaluator] = value;
    }

    function isClaimEvaluatorKnown(address checkAddress) companyOnly public view returns(bool) {
        return claimEvaluators[checkAddress];
    }

    function getHolderPolicies(uint holderId) public view returns (address[] memory){
        return policiesMapping[holderId];
    }
}

