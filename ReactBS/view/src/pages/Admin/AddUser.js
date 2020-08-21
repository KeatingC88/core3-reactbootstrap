import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../redux/actions";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

class AddUser extends Component {

    constructor(props) {
        super(props)
        this.state = { input: "" }
    }

    handleSubmit = () => {
        this.props.addUser(this.state.input);
        this.setState({ input: "" })
    }

    updateInput = (input) => {
        this.setState({ input })
    }

    submit = () => {
        console.log("submitted");
        
    }

    validation = () => {
        console.log("validating...");
    }

    render( ) {
        return (
            <Form>
                <Form.Group className="m-0" controlId="">
                    <InputGroup>
                        <FormControl
                            placeholder="Enter a New Email"
                            aria-label="User Email"
                            aria-describedby="Adding a User Email"
                            onChange={e => this.updateInput(e.target.value)}
                            value={this.state.input}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.handleSubmit}>Add Email</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        )
    }
}



export default connect(
    null,
    {addUser}
)(AddUser)