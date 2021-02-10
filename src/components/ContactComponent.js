import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
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
            feedback: '',
            touched: { //Will keep track of wether these 4 fields have been "touched" or not by the user (set up as an object). Using an event called "blur" that fires when a user enters an input field and leaves it.
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);//binds the reference to the "this" keyword for the handleInputChange method. Makes it so you can use the "this" keyword inside handleInputChange and have it point to the correct object. "this" now knows to look for the state in the constructor of this component.
        this.handleSubmit = this.handleSubmit.bind(this);//binds "this" for handleSubmit method
    }

    validate(firstName, lastName, phoneNum, email) {//Method to handle form validation, passing in the values that we wish to validate
        
        const errors = {//set up "errors" object. The properties of this object will hold the error messages for the 4 fields if there are any errors (initialize each with empty string meaning no errors)
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        };

        if (this.state.touched.firstName) {//Checks if the firstName field has been touched, if so then another if statement nested  
            if (firstName.length < 2) { //will check if the length of the value of the field is less than 2, if true put a string into the errors.firstName property.
                errors.firstName = 'First name must be at least 2 characters.';
            } else if (firstName.length > 15) {//check if the first name is over 15 characters.
                errors.firstName = 'First name must be 15 or less characters.';
            }
        }

        if (this.state.touched.lastName) {
            if (lastName.length < 2) { 
                errors.lastName = 'Last name must be at least 2 characters.';
            } else if (lastName.length > 15) {
                errors.lastName = 'Last name must be 15 or less characters.';
            }
        }
        
        const reg = /^\d+$/; //to validate a phone number, use a Regular Expression to specify a pattern to be matched and return true or false if it has been matched. This is checking the phoneNum value to see if it contains only digits.
        if (this.state.touched.phoneNum && !reg.test(phoneNum)) {//check if the phoneNum field has been touched and did it fail the Regular Expression test (does it contain anything that is not a digit)
            errors.phoneNum = 'The phone number should contain only numbers.';
        }
        
        if (this.state.touched.email && !email.includes('@')) { //Check if email field has been touched and if it does not contain an @ symbol
            errors.email = 'Email should contain a @';
        }    

        return errors; //returns the errors object
    }
        
    handleBlur = (field) => () => { //Passing in an argument to this event handler other than the "event" created by JS so must wrap this method in another function, thus the double arrow function. Using an arrow function to define this method so that it doesn't have to be bound using .bind in the constructor
        this.setState({//use setstate to change the touched object, only want to change one of the properties inside of it.  Use spread syntax ...      
            touched: {...this.state.touched, [field]: true}//using the spread syntax inside this object literal will spread out the this.state.touched object, copy over all the old properties & update the property that corresponds to the field that triggered the event. Correct field is updated by using the computed property name syntax to get the name of the property - text string that is passed into this method as "field" is used as a computed name property [field].
        });
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
        
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email)//call the "validate()" method (must use "this" keyword) and pass it the values of the firstName etc that are stored in the state. Not the same as "errors" from "validate()" method because both consts are locally scoped. The method will validate the fields and return the "errors" object that is then stored inside this "errors" vairable. Any time there is a change in the input field, the object will be re-rendered, so the "validate()" method will be called.

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
                                        value={this.state.firstName} //this makes it a considered a "controlled form"
                                        invalid={errors.firstName}//Boolean attribute, so for it's value we set a conditional. This is asking is there a value in this field. An empty string is falsy. So if there is an error in the firstName, this will evaluate as true and set the invalid attribute to true.
                                        onBlur={this.handleBlur("firstName")}//Anytime a user enters and moves away from this field, it will fire this event handler and pass in text string "firstName" to the handleBlur method. This text string is passed in as the argument (field) to handleBlur. "field" is then used inside the method as a computed property name in order to be passed into an object.
                                        onChange={this.handleInputChange} /> {/*Each input gets a onChange event handler set to the method handleInputChange.*/}
                                    <FormFeedback>{errors.firstName}</FormFeedback> {/*Render this component giving it the content of the error message for the inpt */}     
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        invalid={errors.lastName}
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.lastName}</FormFeedback>    
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        invalid={errors.phoneNum}
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phoneNum}</FormFeedback>    
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        invalid={errors.email}
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>    
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