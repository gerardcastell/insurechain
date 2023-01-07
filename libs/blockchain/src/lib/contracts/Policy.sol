// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol"

struct RiskSubject {
    address holder;
    string id;
    string fullName;
    uint birthdate;
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
    bool active;

    modifier restrictedToPolicyHolder(){
        require(msg.sender == riskSubject.holder);
        _;
    }

    modifier restrictedToManager(){
        require(msg.sender == insuranceManager);
        _;
    }

    modifier insuredPeriod(bool isWithin){
        if(isWithin){
            require(now < endDate);
        }else{
            require(now > endDate);
        }
        _;
    }



    constructor(RiskSubject memory _riskSubject, RiskObject memory _riskObject) {
        insuranceManager = msg.sender;
        riskObject = _riskObject;
        riskSubject = _riskSubject;
    }

    function renew() public payable insuredPeriod(false) restrictedToPolicyHolder {
        uint amount = msg.value;
        uint daysToRenew = msg.value / policy.pricingPerDay;
        require(daysToRenew > 0, "You need to renew at least for one day");
        uint secondsToRenew = daysToRenew * 60 * 60 * 24;
        active = true;
        endDate = block.timestamp + secondsToRenew;
    }

    function cancel() public restrictedToPolicyHolder(){

    }


}
