//Import ReactJS System.
import React, { Component } from "react";//ReactJS.
//Storage State Management Connection from Redux System.
import { connect } from "react-redux";//Redux.
//Import BootStrap System.
import { Form, Button, Alert } from "react-bootstrap";//Bootstrap.
//Import Validation System.
import email from "../../../security/validations/email";//Validation for Emails.
//Import Action Methods from Redux Storage System.
import { addUser } from "../../../redux/actions";//Adds User to the Admin's User List.
//Define Add User Component for the Admin Page to add emails to the User List.
class AddUser extends Component {//This component adds user to the User List/Database using a Web API.
    //Class Properties List.
    email = new email();//Check if User has input a full email address...
    //Constructor.
    constructor(props) {//Args from the parent component.
        super(props)//Superset the Props passed by parent component.
        this.state = {//Add User Class State Delcaration.
            input: "",//Input Defaulted empty, but updated on keydown event by the user and the {html-text-input-field}.
            adminAccount: false,//Default is false, but updated on checkBox click.
            inputValid: false,//Default is false, updated on Email Validation Success.
            currentUsersEmail: "",//Default is empty, but updated on Adding an Email Submission of the person adding that email.
            countNumberOfOverallSubmitAttempts: 0,//Starts at 0, but updated everytime the User adds an email to keep track of over-posting/spam from a client level.
            submitAttemptIsOnHold: false,//Default to enable an Admin to add a User at this time, then this changes periodically after the first submission.
            emailValidationMsg: "",
            disabled: false,
            variantColorString: "",
        }//End of Class State.
        this.updateCheckBoxStatus = this.updateCheckBoxStatus.bind(this);//Binding for the Form Checkbox Boolean Value.
    }//End of Constructor for AddUser Component Class.
    //AddUser Methods...
    //Check Form Validation(s) Before Submitting to the Database through the API at Client Side Level.
    handleSubmit = () => {//When Submit button is pressed...

        this.state.countNumberOfOverallSubmitAttempts += 1;
        let emailTest = this.email.validation(this.state.input);//Updating Class Properties with Email Test Result Bool Type.
        this.state.inputValid = emailTest.result;//returns boolean and attaching it to the state of this component.

        //Check if Email is Valid with our System's Input Checks, Existance in Database, System's Blacklist, and etc.
        if (!this.state.inputValid) {
            this.state.emailValidationMsg = emailTest.msg;//Get the Error Message from the Email Object.
            this.setState({ emailValidationMsg: emailTest.msg, variantColorString: "warning" });//Set the Error Message that was given.
        } else if (!this.props.authenticated) {//If the user somehow lost their authorization token in their browser, then prevent the add user process from happening.
            this.setState({ emailValidationMsg: "User no longer has authorization to Add a User.", variantColorString: "danger" });//Set the Error Message that was given.
            //Record Invalidation/Tampered User's Email.
        } else if (this.state.countNumberOfOverallSubmitAttempts >= 5) {
            this.setState({ emailValidationMsg: "User has attempted spam Emails -- slow down.", variantColorString: "warning" });//Set the Error Message that was given.
            setTimeout(() => {
                console.log("spam released.");
                this.state.countNumberOfOverallSubmitAttempts = 0;
            }, 10000);
        } else if (this.state.submitAttemptIsOnHold) {
            this.setState({ emailValidationMsg: "User is unable to Add at this time.", variantColorString:"warning" });//Set the Error Message that was given.
        } else {
            this.state.disabledBtn = true;
            this.setState({ emailValidationMsg: emailTest.msg, variantColorString: "success" });
            this.submit();//If valid email address, submit to the database.
            this.setState({ input: "", adminAccount: false, inputValid: false, variantColorString: "success" });//Reset the Page State to Default Setting.
        }//End If...

        if (!this.state.submitAttemptIsOnHold) {
            this.state.submitAttemptIsOnHold = true;
            setTimeout(() => {
                this.state.submitAttemptIsOnHold = false;
                this.state.disabledBtn = false;
                this.setState({ disabledBtn: false });
                console.log("hold released.");
            }, 5000);
        }

        console.log(this.state.variantColorString);
    }//End Handled Submit.
    /*Add the User to the UsersDB via Action POST to the API*/
    submit = () => {        
        this.props.addUser(this.state.input, this.state.adminAccount);//Submit to the database using Action Method in /Redux/Actions.js.
    }//End of Submit Process.
    /*Update the CheckBox State Input based on User Keydown Events*/
    updateCheckBoxStatus = (e) => {
        this.setState({ adminAccount: e.target.checked });
    }//End updateCheckBoxStatus State.
    /*Update the Input State based on User Keydown Events*/
    updateInput = (input) => {
        input.trim();//Remove WhiteSpace.
        this.setState({ input })//Update component state for User's Input.
    }//UpdateInput

    render() {//ReactJS Default Method to render to the Browser display.
        return (//Set the Form to Straight-Inline Style.
            <Form inline validated={this.inputValid}>
                <Form.Row>
                    
                        <Form.Group className="m-0" controlId="emailAddress">
                            <Form.Label>Add User By Email Address:&nbsp;&nbsp;</Form.Label>
                            <Form.Control//ReactJS-BootStrap Element in JSX
                                placeholder="Enter a New Email"//HTML Bootstrap Element Attribute
                                aria-label="User Email"//HTML Bootstrap Element Attribute
                                aria-describedby="Adding a User Email"//HTML Bootstrap Element Attribute
                                onChange={e => this.updateInput(e.target.value)}//HTML Bootstrap JSX Element Attribute
                                value={this.state.input}//HTML Element Attribute
                                type="email"//HTML Element Attribute
                                required//HTML Element Attribute
                                size="sm"//HTML Bootstrap Element Attribute 
                                disabled={this.state.disabled}
                            />
                        </Form.Group>
                        <Form.Group controlId="submitFormButton">
                        <Button
                            variant="outline-secondary btn-sm"
                            disabled={this.state.disabled}
                            onClick={this.handleSubmit}>Add Email</Button>
                        </Form.Group>
                        <Form.Group controlId="adminAccountCheckBox">
                            <Form.Label>&nbsp;&nbsp;<b>Admin Account?&nbsp;</b></Form.Label>
                            <Form.Check//ReactJS-BootStrap Element
                                type="checkbox"//HTML Element Attribute
                                className="mt-1"//HTML Element Attribute
                                checked={this.state.adminAccount}//HTML Element Attribute
                                onChange={this.updateCheckBoxStatus}//JSX Element Attribute
                            />
                        </Form.Group>
                        <br />
                        <Form.Label>
                            <Alert variant={this.state.variantColorString}>
                                {this.state.emailValidationMsg}
                            </Alert>                            
                        </Form.Label>                    
                </Form.Row>                
            </Form>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state;
    let authenticated = user.authenticated;
    return {authenticated}
};

export default connect(
    mapStateToProps,
    { addUser }
)(AddUser)