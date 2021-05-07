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
    email = new email();//Email Tester Class that returns an Object of 3 properties.
    /**
     *  new Email()'s 3 properties listed below:
        1) result(of the test as boolean), 
        2) msg(feedback of the test as string), 
        3) color for ReactJS - Bootstrap Alert component(feedback of the test as string).
     */
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
            emailValidationMsg: "",//Default for Email Tester's Response Message.
            disabled: false,//Default for GUI controls when disabling the Add Button when the User recently submitted -- ideally to help avoid over-posting and spam on the AddUser Component.
            variantColorString: "",//Default for GUI Alert and Feedback to the User from this AddUser Component.
        }//End of Class State.
        this.updateCheckBoxStatus = this.updateCheckBoxStatus.bind(this);//Binding for the Form Checkbox Boolean Value.
    }//End of Constructor for AddUser Component Class.

    //Check Form Validation(s) Before Submitting to the Database through the WebAPI provided for this Client Side App.
    handleSubmit = () => {//When Submit/Add button is pressed...
        this.state.countNumberOfOverallSubmitAttempts += 1;//Increment the number of times the Add Button was hit to keep track of spam on the GUI...
        let emailTest = this.email.validation(this.state.input);//Set the Response Object from Email Test to a Variable in this Method...
        this.state.inputValid = emailTest.result;//Set Class State Variable with the boolean result from the Email Tester Class.

        //Check User Input if the Email is Valid with our System's Input Checks, Existance in Database, System's Blacklist, and etc.
        if (!this.state.inputValid) {//IF Email Address Is Invalid...
            this.state.emailValidationMsg = emailTest.msg;//Get the Error Message from the Email Response Object...
            this.setState({ emailValidationMsg: emailTest.msg, variantColorString: emailTest.color });//Set the Error Message with appropriate response color...
        } else if (!this.props.authenticated) {//If the user somehow lost their authorization token in their browser, then prevent the add user process from happening.
            this.setState({ emailValidationMsg: "User no longer has authorization to Add a User.", variantColorString: "danger" });//Set the Error Message that was given.
            //Possibly add-on: Record Invalidation/Tampered User's Email to help catch invokers/intiator/debugging reasons/etc.
        } else if (this.state.countNumberOfOverallSubmitAttempts >= 5) {//This is a heavy warning when a user rapidly hits the AddUser Button.
            this.setState({ emailValidationMsg: "User has attempted input spam -- slow down.", variantColorString: "warning" });//Set the Error Message that was given.
            setTimeout(() => {//This resets the number of attempts a user clicked the submit/add button.
                this.state.countNumberOfOverallSubmitAttempts = 0;//Reset this back to zero so we can keep track if there's more spammage.
            }, 20000);//20 seconds time out for the user.
        } else if (this.state.submitAttemptIsOnHold) {//This is what the user would see when adding too fast into AddUser Input box, as a light warning oppose to longer time outs.
            this.setState({ emailValidationMsg: "User is unable to Add at this time.", variantColorString:"warning" });//Set the Error Message that was given.
        } else {//Email Input passed the Validation Process and the User is currently authorized, at this point in code.
            this.state.disabled = true;//The button gets disabled to help prevent over-posting and spam.
            this.setState({ emailValidationMsg: emailTest.msg, variantColorString: emailTest.color });//Update the Class Component of (this) AddUser.
            this.submit();//If valid email address, submit to the database.
            this.setState({ input: "", adminAccount: false, inputValid: false, variantColorString: emailTest.color });//Reset the Page State to Default Setting.
        }//End If...

        if (!this.state.submitAttemptIsOnHold) {
            this.state.submitAttemptIsOnHold = true;
            setTimeout(() => {
                this.state.submitAttemptIsOnHold = false;
                this.state.disabledBtn = false;
                this.setState({ disabled: false, inputValid: false, variantColorString: "", input: "", emailValidationMsg: "" });
            }, 5000);
        }
    }//End Handled Submit.
    /*Add the User to the UsersDB via Action POST to the API*/
    submit = () => {        
        this.props.addUser(this.state.input, this.state.adminAccount);//Submit to the database using Action Method in /Redux/Actions.js.
    }//End of Submit Process.
    /*Update the CheckBox State Input based on User Keydown Events*/
    updateCheckBoxStatus = (e) => {//This will update everytime the User makes a change to the checkbox.
        this.setState({ adminAccount: e.target.checked });//Update component state for User's Checkbox.
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
                            <Form.Label>
                                <Alert variant={this.state.variantColorString}>
                                    {this.state.emailValidationMsg}
                                </Alert>
                            </Form.Label>
                        </Form.Group>                        
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