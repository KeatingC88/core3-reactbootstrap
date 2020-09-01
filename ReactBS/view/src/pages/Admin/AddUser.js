import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../redux/actions";
import { Form, InputGroup, FormControl, Button, Col } from "react-bootstrap";

class AddUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            input: "",
            validated: false
        }
    }

    handleSubmit = () => {
        console.log("handling...");
        if (this.state.validated === true) {
            this.submit();
        } else {
            console.log("There are Errors, enable Alert Box");
        }
    }

    updateInput = (input) => {
        this.setState({ input })
        this.validation(input);
    }

    submit = () => {
        this.props.addUser(this.state.input);
        console.log("submitted");
    }

    validation = (input) => {

        console.log("validating...");
        //Split into Character Segments
        let inputArray = input.split("");
        //Split into Email Segments
        let emailSplit = input.split("@");
        let localEmail = emailSplit[0];
        let domainEmail = emailSplit[1];
        //Get First Char in the Input String.
        let firstCharValue = inputArray[0];
        //Regex Exps
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
        let countDomainLetters = (domainEmail.match(/[A-Za-z]/g) || []).length;
        let countDotsInLocalEmail = (localEmail.match(/[.]/g) || []).length;
        let countDotsInDomainEmail = (domainEmail.match(/[.]/g) || []).length;

        //First Char is a letter or number...
        if (testFirstCharForSpecialChar === true) {
            console.log("First Char cannot have special char.");
            this.state.validated = false;
        }
        //String has @ symbol...
        if (testStringForAtSymbol != true) {
            console.log("String does not contain @");
            this.state.validated = false;
        }
        //String limits 2 dots at most in Email Local
        if (countDotsInLocalEmail >= 2) {
            console.log("Local contains 2 dots.");
            this.state.validated = false;
        }
        //Local has at least 1 letter.
        if (testLocalForAtLeast1Letter !== true) {
            console.log("Local Must contain a Letter.");
            this.state.validated = false;
        }
        //Local has at least 3 letters.
        if (countLocalLetters <= 2) {
            console.log("Local Must contain a minimum of 3 letters.");
            this.state.validated = false;
        }
        //String contains at least 1 dot in the Email Domain
        if (testDomainForDotSymbol != true) {
            console.log("Domain does not contain a '.' symbol.");
            this.state.validated = false;
        }
        //Domain has only 3 dots in the domain.
        if (countDotsInDomainEmail >= 3) {
            console.log("Domain must contain maximum of 3 .'s");
            this.state.validated = false;
        }
        //Domain has at least 3 letters.
        if (countDomainLetters >= 3) {
            console.log("Domain must contain minimum of 3 letters");
            this.state.validated = false;
        }        
    }

    render() {
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} className="m-0" controlId="emailAddress">
                        <Form.Label>Add User By Email Address:</Form.Label>
                            <Form.Control
                                placeholder="Enter a New Email"
                                aria-label="User Email"
                                aria-describedby="Adding a User Email"
                                onChange={e => this.updateInput(e.target.value)}
                                value={this.state.input}
                                type="email"
                                required
                            />
                        <Form.Control.Feedback>Added!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Must Enter a Valid Email</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="outline-secondary float-right" onClick={this.handleSubmit}>Add Email</Button>
                </Form.Row>                
            </Form>
        )
    }
}



export default connect(
    null,
    {addUser}
)(AddUser)