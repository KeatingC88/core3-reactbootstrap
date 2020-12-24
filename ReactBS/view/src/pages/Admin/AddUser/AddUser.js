import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../../redux/actions";
import { Form, Button, Col } from "react-bootstrap";
import email from "../../../security/validations/email";

class AddUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            input: "",
            validated: null
        }
    }
    //Check Email Validation Before Submitting to the Database.
    handleSubmit = () => {
        if (this.state.validated === true) {
            this.submit();//If valid email address, submit to the database.
            this.setState({ input: "" });//Reset the State
        } else {
            console.log("Invalid Email");
        }
    }//handleSubmit
    /*Add the User to the UsersDB via Action POST to the API*/
    submit = () => {
        this.props.addUser(this.state.input);//Submit to the database using Action Method via Users API.
    }//Submit
    /*Update the Input State based on User Keydown Events*/
    updateInput = (input) => {
        this.setState({ input })//Update component state for User's Input.        
        let e = new email(input);//Check if User has input a full email address...
        let testResult = e.validation(input);//Returns bool
        this.setState({ validated: testResult})//Apply the email validation result to the state of this component to allow the user to submit the input.
    }//UpdateInput

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