//Importing from ReactJS Lib.
import { Component } from "react";//Just importing component so this code is visible in ReactJS.

class email extends Component {

    response = {
        result: null,
        msg: null,
        color: null
    };

    constructor(props) {
        super(props);
    }
    //General Purpose Validator.
    validation = (input) => {

        //Preparing the input for deep inspection.
        let inputArray = input.split("");//Split into Characters into array segments.
        let countStringChars = Object.keys(inputArray).length;//Count the total string of Chars.
        let emailSplit = input.split("@");//Split into Email Segments
        let localEmail = emailSplit[0];//Before the "@" symbol of an email.
        let domainEmail = emailSplit[1];//After the "@" symbol of an email.
        let firstCharValueForLocalAddress = inputArray[0];//Get First Char in the Input String.
        //Local and Domain Regex Expression Validation
        let specialCharsRegExp = new RegExp("[^A-Za-z0-9]");//Check if Input String for special characters.
        let letterCharsRegExp = new RegExp("[A-Za-z]");//Check if Input String has only letters as characters.
        let atSymbolRegExp = new RegExp("[@]");//Check if the Input String has an "@" Symbol
        let dotSymbolRegExp = new RegExp("[.]");//Check if the Input String has a "." Symbol
        //Local Email Boolean Return Validations
        let testFirstCharForSpecialChar = specialCharsRegExp.test(firstCharValueForLocalAddress);//Test: string for the first char is NOT a special char.
        let testStringForAtSymbol = atSymbolRegExp.test(input);//Test: string for the "@" symbol.        
        let testLocalForAtLeast1Letter = letterCharsRegExp.test(localEmail);//Test: local address for at least 1 letter.
        //Local Email Numeric Return Counts
        let countLocalLetters = (localEmail.match(/[A-Za-z]/g) || []).length;//Count local address letters.
        let countDotsInLocalEmail = (localEmail.match(/[.]/g) || []).length;//Count local "."'s in the email adress.        
        //Domain Validation
        let testDomainForDotSymbol = dotSymbolRegExp.test(domainEmail);//Test: domain for a "." symbol extension
        let domainEmailArray = domainEmail.split(".");//Set String to an Array.
        let testFirstCharForDomainAddressForSpecialCharacter = specialCharsRegExp.test(domainEmailArray[0].charAt(0));//Test First Char Array to see if it's a special character.        
        let testDomainForAtLeast1Letter = letterCharsRegExp.test(domainEmail);//Test: local address for at least 1 letter.
        let countDomainChars = (domainEmail.match(/[A-Za-z0-9]/g) || []).length;//Counts the Chars in the domain.
        let countDotsInDomainEmail = (domainEmail.match(/[.]/g) || []).length;//This counts the number of characters in the Top Level Domain of an email.
        let topLevelDomain = domainEmailArray[1];
        let topLevelDomainCount = domainEmailArray[1].length;
        let testTopLevelDomainForSpecialCharacters = specialCharsRegExp.test(domainEmailArray[1]);//Test First Char Array to see if it's a special character.
        
        //Validation Begins Here. Return False to deny the email. Update a response Message reason why it's denied for the calling Objects that use this method.        
        if (countStringChars >= 60) {//Entire String maximum length
            this.response.result = false;
            this.response.msg = "Email address is over " + 60 + "characters. Use an email with less characters.";
            this.response.color = "warning";
            return this.response;//Failed Email Validation Test.
        } else if (testFirstCharForSpecialChar) {
            this.response.result = false;
            this.response.msg = "Email address has begun with a first special character or number. No emails can begin with a special character or number.";
            this.response.color = "warning";
            return this.response;//Failed Email Validation Test.
        } else if (!testStringForAtSymbol) {
            this.response.result = false;//Validation Failed.
            this.response.msg = "Email address is missing an @ symbol. Please check the email.";
            this.response.color = "warning";
            return this.response;
        } else if (countDotsInLocalEmail >= 2) {
            this.response.result = false;//Validation Failed.
            this.response.msg = "Email address has more than 2 dots before the @ symbol. Please use another email address.";
            this.response.color = "warning";
            return this.response;//Return Object Data.
        } else if (!testLocalForAtLeast1Letter) {
            this.response.result = false;//Validation Failed.
            this.response.msg = "Email address has less than " + 1 + " letter before the @ symbol. Please use another email address.";
            this.response.color = "warning";
            return this.response;//Return Object Data.
        } else if (countLocalLetters <= 2) {
            this.response.result = false;//Validation Failed.
            this.response.msg = "Email address has less than " + 2 + " letters before the @ symbol. Please use another email address.";
            this.response.color = "warning";
            return this.response;//Return Object Data.
        } else if (countDomainChars < 7) {
            this.response.result = false;//Validation Failed.
            this.response.msg = "Email address must have more than 3 characters in the domain. Please use another email address.";
            this.response.color = "warning";
            return this.response;//Return Object Data.
        } else if (!testDomainForDotSymbol) {//There's no dot in the Domain.
            this.response.result = false;//Validation Failed.
            this.response.msg = "Email address has less than 1 dot after the @ symbol. Please use another email address.";
            this.response.color = "warning";
            return this.response;//Return Object Data.
        } else if (!testDomainForAtLeast1Letter) {
            this.response.result = false;//Validation Failed.
            this.response.msg = "Email address has less than 1 letter after the @ symbol. Please use another email address.";
            this.response.color = "warning";
            return this.response;//Return Object Data.
        } else if (countDotsInDomainEmail > 1) {
            this.response.result = false;//Validation Failed.
            this.response.msg = "Unable accept sub-domain emails. Please use another email address.";
            this.response.color = "danger";
            return this.response;//Return Object Data.
        } else if (topLevelDomainCount > 3) {
            this.response.result = false;//Validation Failed.
            this.response.msg = "Invalid Top Level Domain " + topLevelDomain + ". Please use another email address.";
            this.response.color = "danger";
            return this.response;//Return Object Data.
        } else if (testTopLevelDomainForSpecialCharacters) {
            this.response.result = false;//Validation Failed.
            this.response.msg = "Invalid Top Level Domain " + topLevelDomain + ". Please use another email address.";
            this.response.color = "danger";
            return this.response;//Return Object Data.
        } else if (testFirstCharForDomainAddressForSpecialCharacter) {//First Character is a Special Character after the @ symbol in an email address.
            this.response.result = false;//Validation Failed.
            this.response.msg = "Email address has a special character " + domainEmailArray[0].charAt(0) + ". Please use another email address.";
            this.response.color = "danger";
            return this.response;//Return Object Data.
        } else {//If everything checks out, return True.
            this.response.result = true;
            this.response.msg = "Valid Email!";//empty the response message as there are no errors.
            this.response.color = "success";
            return this.response;//Class needs to return true for a Valid Email Address...
        }        
    }
    /*
    emailDomainStringValidation() {
        let foo = false;
        let bar = true;
        return null;
    }

    emailLocalStringValidation() {
        let foo = false;
        let bar = true;
        return null;
    }

    emailExistsInThisDatabase(email, databaseName) {
        let foo = false;
        let bar = true;
        return null;
    }

    emailIsBlackListedInThisDatabase(email, databaseName) {
        let foo = false;
        let bar = true;
        return null;
    }

    emailDomainIsBlacklistedInThisDatabase() {
        let foo = false;
        let bar = true;
        return null;
    }
    */
}

export default email;
