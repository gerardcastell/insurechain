// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct Claim {
    string title;
    address expertAddress;
    uint incidentDate;
    uint expenses;
    bool approved;
    uint resolveDate;
    bool isResolved;
}


contract Policy { uint policyHolder;
    string riskObject;
    uint256 premium;
    address owner;
    address insuranceAddress;
    uint endDate;
    uint startDate;
    mapping(uint256 => Claim) claims;


    modifier onlyCompanyOrOwner(){
        require(msg.sender == insuranceAddress || msg.sender == owner, "Just the policyholder or the insurance company can perform this action");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Just the policyholder can perform this action");
        _;
    }

    modifier onlyCompany(){
        require(msg.sender == insuranceAddress, "Just the insurance company can perform this action");
        _;
    }

    modifier isActive(){
        require(endDate > block.timestamp, "Policy is not active");
        _;
    }


    constructor(uint _policyHolder, string memory _riskObject, uint256 _premium, address _owner, uint _endDate){
        require(_endDate > block.timestamp, "Renewal date has to be upcoming");
        require(_premium > 0 , "Required a premium to activate the policy");
        policyHolder = _policyHolder;
        riskObject = _riskObject;
        premium = _premium;
        owner = _owner;
        insuranceAddress = msg.sender;
        startDate = block.timestamp;
        endDate = _endDate;
    }

    function cancelPolicy() onlyCompanyOrOwner isActive external {
        endDate = block.timestamp;
    }

    function makeClaim(uint256 claimId, Claim memory _claim) onlyOwner isActive external {
        Claim memory newClaim = _claim;
        claims[claimId] = newClaim;
        claims[claimId].isResolved = false;
    }


    function approveClaim(uint256 claimId , uint256 claimExpenses) onlyCompany external {
        Claim storage claim = claims[claimId];

        resolveClaim(claimId, true);
        claim.expenses = claimExpenses;
    }

    function declineClaim(uint256 claimId) onlyCompany external{
        resolveClaim(claimId, false);
    }

    function resolveClaim(uint256 claimId, bool isApproved) internal {
        Claim storage claim = claims[claimId];
        require(claim.isResolved == false, "Claim is already resolved");

        claim.resolveDate = block.timestamp;
        claims[claimId].isResolved = true;
        claim.approved = isApproved;

    }

    function getOwnerAddress() onlyCompanyOrOwner external view returns (address) {
        return owner;
    }

    function renew(uint daysToAdd) onlyCompany external returns (uint){
        endDate = endDate + (daysToAdd * 1 days);
        return endDate;
    }
}
