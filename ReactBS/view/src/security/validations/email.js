import React, { Component } from "react";

class email extends Component {    

    validation = (input) => {
        //console.log("validating email...");
        //Split into Character Segments
        let inputArray = input.split("");
        //Split into Email Segments
        let emailSplit = input.split("@");
        let localEmail = emailSplit[0];
        let domainEmail = emailSplit[1];
        //Get First Char in the Input String.
        let firstCharValue = inputArray[0];
        //Regex Exps Validation
        let specialCharsRegExp = new RegExp("[^A-Za-z0-9]");
        let letterCharsRegExp = new RegExp("[A-Za-z]");
        let atSymbolRegExp = new RegExp("[@]");
        let dotSymbolRegExp = new RegExp("[.]");
        //Boolean Return Validations
        let testFirstCharForSpecialChar = specialCharsRegExp.test(firstCharValue);
        let testStringForAtSymbol = atSymbolRegExp.test(input);
        let testDomainForDotSymbol = dotSymbolRegExp.test(domainEmail);
        let testLocalForAtLeast1Letter = letterCharsRegExp.test(localEmail);
        //Numeric Return Counts
        let countLocalLetters = (localEmail.match(/[A-Za-z]/g) || []).length;
        let countDotsInLocalEmail = (localEmail.match(/[.]/g) || []).length;
        //First Char is a letter or number...
        if (testFirstCharForSpecialChar === true) {
            return false;
        } else
        //String has @ symbol...
        if (testStringForAtSymbol !== true) {
            return false;
        } else
        //String limits 2 dots at most in Email Local
        if (countDotsInLocalEmail >= 2) {
            return false;
        } else
        //Local has at least 1 letter.
        if (testLocalForAtLeast1Letter !== true) {
            return false;
        } else
        //Local has at least 3 letters.
        if (countLocalLetters <= 2) {
            return false;
        } else
        //String contains at least 1 dot in the Email Domain
        if (testDomainForDotSymbol !== true) {
            return false;
        } else {
            return true;
        }
        //Domain Validation
        //let countDomainLetters = (domainEmail.match(/[A-Za-z]/g) || []).length;
        //let countDotsInDomainEmail = (domainEmail.match(/[.]/g) || []).length;
        /*
        //Domain has at least 3 letters.
        if (countDomainLetters >= 3) {
            console.log("Domain must contain minimum of 3 letters");
            this.state.validated = false;
        }
        
        //Domain has only 3 dots in the domain.
        if (countDotsInDomainEmail >= 3) {
            console.log("Domain must contain maximum of 3 .'s");
            this.state.validated = false;
        }
        */
        //this.setState({ validated: false });        
    }
}

export default email;