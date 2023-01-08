// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct RiskSubject {
    address holder;
    string id;
    string fullName;
    uint birthDate;
    string driverLicense;
    uint licenseExpirationDate;
}

struct RiskObject {
    string makerId;
    string modelId;
    string versionId;
    uint releaseDate;
    string maker;
    string model;
    string version;
    uint purchaseDate;
    uint purchasePrice;
    string plate;
    uint plateDate;
    string fuelType;
    uint power;
    uint numberDoors;
    string parking;
    string usage;
    uint kmsYear;
}

struct Claim {
    string description;
    uint amountToPay;
    bool resolved;
    uint date;
}

contract Policy {
    address insuranceManager;
    uint endDate;
    uint pricingPerDay;
    RiskObject riskObject;
    RiskSubject riskSubject;
    Claim[] claims;

    modifier restrictedToPolicyHolder(){
        require(msg.sender == riskSubject.holder);
        _;
    }

    modifier restrictedToManager(){
        require(msg.sender == insuranceManager);
        _;
    }

    modifier insuredPeriod(){
        require(block.timestamp < endDate);
        _;
    }

    constructor(RiskSubject memory _riskSubject, RiskObject memory _riskObject) {
        insuranceManager = msg.sender;
        riskObject = _riskObject;
        riskSubject = _riskSubject;
    }

    function renew() public payable insuredPeriod restrictedToPolicyHolder {
        uint daysToRenew = msg.value / pricingPerDay;
        require(daysToRenew > 0, "You must renew at least 1 day");
        uint secondsToRenew = daysToRenew * 60 * 60 * 24;

        if(endDate < block.timestamp){
            endDate = block.timestamp + secondsToRenew;
        }else{
            endDate = endDate + secondsToRenew;
        }
    }

    function cancel() public restrictedToPolicyHolder(){
        endDate = block.timestamp;
    }


}
