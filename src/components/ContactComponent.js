import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,
            contactType: 'By Phone',
            feedback: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);//binds the reference to the "this" keyword for the handleInputChange method. Makes it so you can use the "this" keyword inside handleInputChange and have it point to the correct object. "this" now knows to look for the state in the constructor of this component.
        this.handleSubmit = this.handleSubmit.bind(this);//binds "this" for handleSubmit method
    }

    handleInputChange(event) { //pass in "event" object
        const target = event.target; //just make it easier/less typing to reference property event.target
        const name = target.name; //just make it easier/less typing to reference property event.target.name
        const value = target.type === 'checkbox' ? target.checked : target.value;//if the type of the form element that triggered this event is a checkbox, then get the value from the target's checked attribute (boolean attribute), if not a checkbox, we get the value from the targets "value" 

        this.setState({ //this uses setState with a computed property name to set the property based on the target's name. Depending on which form element triggered the event, that could be FirstName or LastName or Email, etc. The name is taken from the "event" object that was passed in (part of the event object created by JS). The value, we used what is stored in the "value" const above.
            [name]: value
        });
    }

    handleSubmit(event) {//set up as console.log for demonstartion purposes
        console.log("Current state is: " + JSON.stringify(this.state));//console.log expects a string. To make a string from a JS object, use JSON.stringify()
        alert("Current state is: " + JSON.stringify(this.state));
        event.preventDefault();//submitting a form usually refreshes the entire page, we don't want that to happen
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                        <Form onSubmit={this.handleSubmit}> {/*Entire form gets an onSubmit event handler*/}
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label> {/*htmlFor=" " is the same as using for=" " in normal HTML because "for" in JS is a "for" loop */}
                                <Col md={10}> {/*ReactStrap syntax, Equivalent to writing BootStrap's <div className="col-md-10">*/}
                                    <Input type="text" id="firstName" name="firstName" //usual attributes for forms are required
                                        placeholder="First Name"
                                        value={this.state.firstName} //this makes it a controlled form
                                        onChange={this.handleInputChange} /> {/*Each input gets a onChange event handler set to the method handleInputChange.*/} 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        onChange={this.handleInputChange} />
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 4, offset: 2}}> {/*giving this an object that includes a size and an offset.  To define that object, a second set of {} must be used.  Set both the responsive size and the responsive offset at the same time. Equivlent to BootStrap class="col-md-4 offset-md-2"*/}
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree} //used instead of "value" attribute
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" name="feedback"
                                        rows="12"
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;