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
    string riskData;
    uint256 premium;
    address owner;
    address public factoryAddress;
    uint endDate;
    uint renewalDate;
    uint startDate;
    mapping(uint256 => Claim) claims;
    uint256[] claimIdList;

    event Creation(address policyholderAddress);
    event Cancelation(uint endDate);
    event ClaimDeclaration(uint claimId);
    event ClaimApproved(uint claimId);
    event ClaimDeclined(uint claimId);
    event Renewal(uint endDate);

    modifier onlyFactoryOrOwner(){
        require(msg.sender == factoryAddress || msg.sender == owner, "Just the policyholder or the insurance company can perform this action");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Just the policyholder can perform this action");
        _;
    }

    modifier onlyFactory(){
        require(msg.sender == factoryAddress, "Just the insurance company can perform this action");
        _;
    }

    modifier isActive(){
        require(endDate > block.timestamp && renewalDate > block.timestamp, "Policy is not active");
        _;
    }

    constructor(string memory _proposalData, uint256 _premium, address _owner, uint256 _endDate){
        require(_endDate > block.timestamp, "Renewal date has to be upcoming");
        require(_premium > 0 , "Required a premium to activate the policy");
        riskData = _proposalData;
        premium = _premium;
        owner = _owner;
        factoryAddress = msg.sender;
        startDate = block.timestamp;
        endDate = _endDate;
        renewalDate = _endDate;

        emit Creation(owner);
    }

    function cancelPolicy() onlyFactory() isActive external {
        endDate = block.timestamp;
        emit Cancelation(endDate);
    }

    function makeClaim(uint256 claimId, Claim memory _claim) onlyOwner isActive external {
        Claim memory newClaim = _claim;
        claims[claimId] = newClaim;
        claims[claimId].isResolved = false;
        emit ClaimDeclaration(claimId);
    }


    function approveClaim(uint256 claimId , uint256 claimExpenses) onlyFactory external {
        Claim storage claim = claims[claimId];

        resolveClaim(claimId, true);
        claim.expenses = claimExpenses;
        emit ClaimApproved(claimId);
    }

    function declineClaim(uint256 claimId) onlyFactory external{
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

    function renew(uint newEndDate, uint256 _renewalPremium) onlyFactory external returns (uint){
        require(newEndDate > endDate, "New end date has to be after the current one");
        endDate = newEndDate;
        renewalDate = newEndDate;
        premium = _renewalPremium;

        emit Renewal(endDate);
        return renewalDate;
    }


    function getOwnerAddress() onlyFactoryOrOwner external view returns (address) {
        return owner;
    }

    function getClaim(uint256 claimId) onlyFactoryOrOwner external view returns (Claim memory){
        return claims[claimId];
    }

    function getClaimsList() onlyFactoryOrOwner external view returns (uint256[] memory){
        return claimIdList;
    }

    function getEndDate() onlyFactoryOrOwner external view returns (uint){
        return endDate;
    }

    function getStartDate() onlyFactoryOrOwner external view returns (uint){
        return startDate;
    }

    function getRenewalDate() onlyFactoryOrOwner external view returns (uint){
        return renewalDate;
    }

    function getRiskData() onlyFactoryOrOwner external view returns (string memory){
        return riskData;
    }

     function getPremium() onlyFactoryOrOwner external view returns (uint256){
        return premium;
    }

    function getIsActive()onlyFactoryOrOwner external view returns (bool){
        return endDate > block.timestamp;
    }

}
