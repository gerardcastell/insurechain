// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

struct Claim {
    string title;
    address expertAddress;
    uint incidentDate;
    uint expenses;
    bool approved;
    uint resolveDate;
    bool isResolved;
}


contract Policy {
    string riskObject;
    uint256 premium;
    address owner;
    address insuranceAddress;
    uint endDate;
    uint startDate;
    mapping(uint256 => Claim) claims;
    uint256[] claimIdList;

    event Creation(address policyholderAddress);
    event Cancelation(uint endDate);
    event ClaimDeclaration(uint claimId);
    event ClaimApproved(uint claimId);
    event ClaimDeclined(uint claimId);
    event Renewal(uint endDate);

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


    constructor(string memory _riskObject, uint256 _premium, address _owner, uint256 _endDate){
        require(_endDate > block.timestamp, "Renewal date has to be upcoming");
        require(_premium > 0 , "Required a premium to activate the policy");
        riskObject = _riskObject;
        premium = _premium;
        owner = _owner;
        insuranceAddress = msg.sender;
        startDate = block.timestamp;
        endDate = _endDate;

        emit Creation(owner);
    }

    function cancelPolicy() onlyCompanyOrOwner isActive external {
        endDate = block.timestamp;
        emit Cancelation(endDate);
    }

    function makeClaim(uint256 claimId, Claim memory _claim) onlyOwner isActive external {
        Claim memory newClaim = _claim;
        claims[claimId] = newClaim;
        claims[claimId].isResolved = false;
        emit ClaimDeclaration(claimId);
    }


    function approveClaim(uint256 claimId , uint256 claimExpenses) onlyCompany external {
        Claim storage claim = claims[claimId];

        resolveClaim(claimId, true);
        claim.expenses = claimExpenses;
        emit ClaimApproved(claimId);
    }

    function declineClaim(uint256 claimId) onlyCompany external{
        resolveClaim(claimId, false);
        emit ClaimDeclined(claimId);
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

    function renew(uint newEndDate) onlyCompany external returns (uint){
        require(newEndDate > endDate, "New end date has to be after the current one");
        endDate = newEndDate;

        emit Renewal(endDate);
        return endDate;
    }

    function getClaim(uint256 claimId) onlyCompanyOrOwner external view returns (Claim memory){
        return claims[claimId];
    }

    function getClaimsList() onlyCompanyOrOwner external view returns (uint256[] memory){
        return claimIdList;
    }

    function getEndDate() onlyCompanyOrOwner external view returns (uint){
        return endDate;
    }
}
