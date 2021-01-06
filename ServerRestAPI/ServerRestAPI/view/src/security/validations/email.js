import { Component } from "react";

class email extends Component {    
    
    validation = (input) => {
        //console.log("validating email...");
        let inputArray = input.split("");//Split into Characters into array segments.
        let countStringChars = Object.keys(inputArray).length;//Count total string of Chars.
        let emailSplit = input.split("@");//Split into Email Segments
        let localEmail = emailSplit[0];//Before the "@" symbol of an email.
        let domainEmail = emailSplit[1];//After the "@" symbol of an email.        
        let firstCharValue = inputArray[0];//Get First Char in the Input String.
        //Regex Exps Validation
        let specialCharsRegExp = new RegExp("[^A-Za-z0-9]");//Check if Input String for special characters.
        let letterCharsRegExp = new RegExp("[A-Za-z]");//Check if Input String has only letters as characters.
        let atSymbolRegExp = new RegExp("[@]");//Check if the Input String has an "@" Symbol
        let dotSymbolRegExp = new RegExp("[.]");//Check if the Input String has a "." Symbol
        //Boolean Return Validations
        let testFirstCharForSpecialChar = specialCharsRegExp.test(firstCharValue);//Test: string for the first char is NOT a special char.
        let testStringForAtSymbol = atSymbolRegExp.test(input);//Test: string for the "@" symbol.
        let testDomainForDotSymbol = dotSymbolRegExp.test(domainEmail);//Test: domain for a "." symbol extentsion
        let testLocalForAtLeast1Letter = letterCharsRegExp.test(localEmail);//Test: local address for at least 1 letter.
        //Numeric Return Counts
        let countLocalLetters = (localEmail.match(/[A-Za-z]/g) || []).length;//Count local address letters.
        let countDotsInLocalEmail = (localEmail.match(/[.]/g) || []).length;//Count local "."'s in the email adress.
 
        //Entire String maximum length
        if (countStringChars >= 70) {
            return false;
        } else
        //First Char is a letter or number? First character needs be a letter and not a special character.
        if (testFirstCharForSpecialChar === true) {
            return false;
        } else
        //String must have an "@"symbol... Otherwise it's possible it's not an email address.
        if (testStringForAtSymbol !== true) {
            return false;
        } else
        //String ls limited 2 dots, at most, in Local address of an email. 
        if (countDotsInLocalEmail >= 2) {
            return false;
        } else
        //Local address must have at least 1 letter.
        if (testLocalForAtLeast1Letter !== true) {
            return false;
        } else
        //Local email has at least 3 letters.
        if (countLocalLetters <= 2) {
            return false;
        } else
        //String contains at least 1 dot in the Email Domain address.
        if (testDomainForDotSymbol !== true) {
            return false;
        } else {
            return true;//Class needs to return true for a Valid Email Address...
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
    }
}

export default email;