// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./Policy.sol";


contract Factory {
    address payable public insuranceAddress;
    uint256 minimumBudget = 0.999 ether;
    mapping(address => address[]) policiesMapping;
    mapping(address => bool) private claimEvaluators;
    event PolicyCreated(address owner, uint when);
    event PolicyRenewal(address policy, uint newDate, uint renewalAmount);
    event ClaimApproved(address policyAddress ,uint256 claimId , uint256 claimExpenses);
    event ClaimDeclined(address policyAddress, uint256 claimId);
    event BudgetAdded(uint amount);
    event BudgetWithdrawal(uint amount);

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
        emit BudgetAdded(msg.value);
        return address(this).balance;
    }

    function withdrawBudget(uint256 amount) companyOnly public returns (uint256){
        require(amount < address(this).balance, "There is not enough amount to withdraw");
        insuranceAddress.transfer(amount);
        emit BudgetWithdrawal(amount);
        return address(this).balance;
    }

    function createPolicy(string memory proposalData, uint endDate) public payable returns (address){
        require(msg.value > 0, "To create a policy you must pay a premium.");
        Policy policyContract = new Policy( proposalData, msg.value, msg.sender, endDate);
        address policyAddress = address(policyContract);
        address holderId = msg.sender;
        policiesMapping[holderId].push(policyAddress);

        emit PolicyCreated(msg.sender, block.timestamp);
        return policyAddress;
    }

    // Renews the policy and return the new end date.
    function renewPolicy(address policyAddress, uint newEndDate, uint renewalAmount) public payable returns (uint){
        require(msg.value > renewalAmount, "To renew a policy you must pay a premium.");
        Policy policyContract = Policy(policyAddress);
        require(msg.sender == policyContract.getOwnerAddress(), "Just the policyholder of the policy is able to renew it.");
        emit PolicyRenewal(policyAddress, newEndDate, renewalAmount);

        return policyContract.renew(newEndDate);
    }


    function approveClaim(address policyAddress ,uint256 claimId , uint256 claimExpenses) claimEvaluatorsOnly public {
        require(claimExpenses < address(this).balance, "Insufficient balance to pay the claim.");

        Policy policy = Policy(policyAddress);
        policy.approveClaim(claimId, claimExpenses);

        address payable holderAddress = payable(policy.getOwnerAddress());
        emit ClaimApproved( policyAddress, claimId, claimExpenses);
        holderAddress.transfer(claimExpenses);
    }

    function declineClaim(address policyAddress, uint256 claimId) claimEvaluatorsOnly public {
        Policy policy = Policy(policyAddress);
        emit ClaimDeclined(policyAddress, claimId);
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

    function getHolderPolicies() public view returns (address[] memory){
        return policiesMapping[msg.sender];
    }
}

