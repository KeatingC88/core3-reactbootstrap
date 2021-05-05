//Importing from ReactJS Lib.
import { Component } from "react";//Just importing component so this code is visible in ReactJS.

class email extends Component {

    response = {
        result: null,
        msg: "",
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

        if (domainEmail) {
            console.log(domainEmail);
            let countDomainLetters = (domainEmail.match(/[A-Za-z]/g) || []).length;
            let countDotsInDomainEmail = (domainEmail.match(/[.]/g) || []).length;
            
            //console.log(countDotsInDomainEmail);
            //console.log(countDomainLetters);
            //console.log(testDomainForDotSymbol);
        }
        

        
        

        //Validation Begins Here. Return False to deny the email. Update a response Message reason why it's denied for the calling Objects that use this method.        
        if (countStringChars >= 60) {//Entire String maximum length
            this.response.result = false;
            this.response.msg = "Email address is over " + 60 + "characters. Use an email with less characters.";
            return this.response;//Failed Email Validation Test.
        } else//First Char is a letter or number? First character needs be a letter and not a special character.        
        if (testFirstCharForSpecialChar === true) {
            this.response.result = false;
            this.response.msg = "Email address has begun with a first special character or number. No emails can begin with a special character or number.";
            return this.response;//Failed Email Validation Test.
        } else//String must have an "@"symbol... Otherwise it's possible it's not an email address.        
        if (testStringForAtSymbol !== true) {
            this.response.result = false;
            this.response.msg = "Email address is missing an @ symbol. Please check the email.";
            return this.response;
        } else//String ls limited 2 dots, at most, in Local address of an email.         
        if (countDotsInLocalEmail >= 2) {
            this.response.result = false;
            this.response.msg = "Email address has more than 2 dots before the @ symbol. Please use another email address.";
            return this.response;//Failed Email Validation Test.
        } else//Local address must have at least 1 letter.
        if (testLocalForAtLeast1Letter !== true) {
            this.response.result = false;
            this.response.msg = "Email address has less than " + 1 + " letter before the @ symbol. Please use another email address.";
            return this.response;//Failed Email Validation Test.
        } else//Local email has at least 3 letters.
        if (countLocalLetters <= 2) {
            this.response.result = false;
            this.response.msg = "Email address has less than " + 2 + " letters before the @ symbol. Please use another email address.";
            return this.response;//Failed Email Validation Test.
        } else//String contains at least 1 dot in the Email Domain address.
        if (testDomainForDotSymbol !== true) {
            this.response.result = false;
            this.response.msg = "Email address has less than 1 dot after the @ symbol. Please use another email address.";
            return this.response;//Failed Email Validation Test.
        } else {//If everything checks out, return True.
            this.response.result = true;
            this.response.msg = "Valid Email!";//empty the response message as there are no errors.
            return this.response;//Class needs to return true for a Valid Email Address...
        }        
    }

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
}

export default email;