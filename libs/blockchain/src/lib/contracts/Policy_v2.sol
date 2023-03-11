// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct Claim {
    string title;
    address expertAddress;
    uint incidentDate;
    uint expenses;
    bool approved;
    uint resolveDate;
}


contract Policy {
    uint policyHolder;
    string riskObject;
    uint256 premium;
    address owner;
    address insuranceAddress;
    uint endDate;
    uint startDate;
    mapping(uint256 => Claim[]) claims;


    modifier onlyCompanyOrOwner(){
        require(msg.sender == insuranceAddress || msg.sender == owner);
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier onlyCompany(){
        require(msg.sender == insuranceAddress);
        _;
    }


    constructor(uint _policyHolder, string memory _riskObject, uint256 _premium, address _owner, uint _endDate){
        policyHolder = _policyHolder;
        riskObject = _riskObject;
        premium = _premium;
        owner = _owner;
        insuranceAddress = msg.sender;
        startDate = block.timestamp;
        endDate = _endDate;
    }

    function cancelPolicy() onlyCompanyOrOwner external {
        endDate = block.timestamp;
    }

    function makeClaim(uint256 claimId, Claim memory _claim) onlyOwner external {
        Claim memory newClaim = _claim;
        claims[claimId].push(newClaim);
    }

    // Functions for experts
    function approveClaim(uint256 claimId , uint256 claimExpenses) onlyCompany external {
        Claim[] storage _claims = claims[claimId];
        Claim storage claim = _claims[claimId];

        claim.expenses = claimExpenses;
        resolveClaim(claimId, true);
    }

    function declineClaim(uint256 claimId) onlyCompany external{
        resolveClaim(claimId, false);
    }

    function resolveClaim(uint256 claimId, bool isApproved) internal {
        Claim[] storage _claims = claims[claimId];
        Claim storage claim = _claims[claimId];

        claim.resolveDate = block.timestamp;
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
