//Import ReactJS System.
import React, { Component } from "react";//ReactJS.
//Storage State Management Connection from Redux System.
import { connect } from "react-redux";//Redux.
//Import BootStrap System.
import { Form, Button } from "react-bootstrap";//Bootstrap.
//Import Validation System.
import email from "../../../security/validations/email";//Validation for Emails.
//Import Action Methods from Redux Storage System.
import { addUser } from "../../../redux/actions";//Adds User to the Admin's User List.

class AddUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            input: "",
            adminAccount: false,
            validated: false
        }
        this.updateCheckBoxStatus = this.updateCheckBoxStatus.bind(this);
    }    
    //Check Email Validation Before Submitting to the Database.
    handleSubmit = () => {
        if (this.state.validated === false) {            
            console.log("Invalid Input for Email Address.");
        } else if (this.props.authenticated !== true) {
            console.log("Not Authorized to Add an Email.");
        } else {
            this.submit();//If valid email address, submit to the database.
            this.setState({ input: "", adminAccount: false, validated: false });//Reset the Page State to Default Setting.
        }
    }//Handled the Submit Process of Checking User Authentication, Checking if the User Input is a Valid Email Address at Client-Side Only.
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
        this.setState({ input })//Update component state for User's Input.        
        let e = new email(input);//Check if User has input a full email address...
        let testResult = e.validation(input);//Returns bool
        this.setState({ validated: testResult})//Apply the email validation result to the state of this component to allow the user to submit the input.
    }//UpdateInput

    render() {
        return (//Set the Form to Straight-Inline Style.
            <Form inline>
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
                            />
                        <Form.Control.Feedback>Added!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Must Enter a Valid Email</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="submitFormButton">
                        <Button variant="outline-secondary btn-sm" onClick={this.handleSubmit}>Add Email</Button>
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