import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length; //recieves the value as an argument (will be a string value because all form inputs are recieved as strings even if they are numbers). Checks to make sure there was a value that was not "undefined" or "null" AND that the length of the string is greater than zero. Makes sure that a field has something in it. If retruns false, it will fail this test and cause an error.
const maxLength = len => val => !val || (val.length <= len); //The way this function is called later in the file requires that it be a funciton wrapped in a function. First function takes the maximum length then the second funciton takes the value (input string). Then from inside the inner function we return true if the max length has not been exceeded. !val will return true because if there is no value then the max length has not been exceeded OR also return true if the value's length is less than or equal to (<=) the maximum. If both are false, will return false for maxLength meaning failed the test for max length which will create an error.
const minLength = len => val => val && (val.length >= len); //This function works similar to maxLength. Inner function returs true if there is a value AND the value was greater than or equal to the minimum. Return false if either condition is false meaning it falied the test for min length and will create an error.
const isNumber = val => !isNaN(+val); //Check to see if the value is a number,\. + turns the value into the number (if it can be) if not it will be turned into NaN. Check to see if the value is the opposite of isNan by using "!isNaN". If not a valid number it will return false, if it is a number it will return true. 
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val); //Check for a valid email. Check it begins with A-Z, then contains only the characters that are valid in an email address (0-9 . _ % + -) Check for @ sign, Check for characters A-Z, 0-9 . - Then a . is required and a domain extension that can be between 2 to 4 numbers.  Then use built in JS method "test" which tests whatever value is passed in to see if it matches the RegEx pattern.

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

        this.handleSubmit = this.handleSubmit.bind(this);//binds "this" for handleSubmit method
    }
     
    handleSubmit(values) {//set up as console.log for demonstartion purposes. Argument was "event" when using React, changed to "values" for React-Redux-Form use.
        console.log("Current state is: " + JSON.stringify(values));//console.log expects a string. To make a string from a JS object, use JSON.stringify(). Argument was "this.state", changed to "values" for React-Redux-Form use.
        alert("Current state is: " + JSON.stringify(values)); //Argument was "this.state", changed to "values" for React-Redux-Form use.
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
                        <LocalForm onSubmit={values => this.handleSubmit(values)}> {/*Entire form gets an onSubmit event handler. Changed from React's <Form> to React-Redux-Form's <LocalForm>. <LocalForm> requires it to be converted to an arrow function and have the "values" object passed to it.*/}
                            <Row className="form-group"> {/*change from <FormGroup row> to a <Row> because we are no longer using the FormGroup component from ReactStrap since that only works with the ReactStrap <Form> which was replaced by <LocalForm>*/}
                                <Label htmlFor="firstName" md={2}>First Name</Label> {/*htmlFor=" " is the same as using for=" " in normal HTML because "for" in JS is a "for" loop */}
                                <Col md={10}> {/*ReactStrap syntax, Equivalent to writing BootStrap's <div className="col-md-10">*/}
                                    <Control.text model=".firstName" id="firstName" name="firstName" //usual attributes for forms are required (except type="text" is no longer needed because Control.text covers that attribute, it was needed when the element was a <Input>). "model" attribute added to tell Redux that the value for the field will be stored in the state under the property name of whatever model=".name" is. Value in the "model" attribute will always be the same as the "name" attribute.
                                        placeholder="First Name"
                                        className="form-control" //Added due to using Redux. Previously, the <Input> from ReactStrap took care of this class.
                                        validators={{ //Add this property for Redux form validation. For its value, we give it an object of the functions that are valid for that component.
                                            required,
                                            minLength: minLength(2), //Not sure how these are working with the minLength and maxLength funcitons.
                                            maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors //Added for React-Redux-Form
                                        className="text-danger" //Make error text color red
                                        model=".firstName" //Must match the model of the corresponding <Control> component
                                        show="touched" //Cause the form fill only show error messages if it's been touched by the user
                                        component="div" //Tells React-redux-form to wrap each error message in a <div>
                                        messages= {{//These are the error messages that are shown for the functions in "validators" if they return false
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{ 
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".lastName"
                                        show="touched"
                                        component="div"
                                        messages= {{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />                                
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        className="form-control"
                                        validators={{ 
                                            required,
                                            minLength: minLength(10),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger" 
                                        model=".phoneNum"
                                        show="touched"
                                        component="div"
                                        messages= {{
                                            required: 'Required',
                                            minLength: 'Must be at least 10 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />                                
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{ 
                                            required,
                                            validEmail
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        component="div"
                                        messages= {{
                                            required: 'Required',
                                            validEmail: 'Invalid email address'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 4, offset: 2}}> {/*giving this an object that includes a size and an offset.  To define that object, a second set of {} must be used.  Set both the responsive size and the responsive offset at the same time. Equivlent to BootStrap class="col-md-4 offset-md-2"*/}
                                    <div className="form-check"> {/*Turn into this from <FormGroup check> due to change to React-Redux-Form*/}
                                        <Label check>
                                            {/*was Input type="checkbox" when not using React-Redux-Form*/} <Control.checkbox 
                                                model=".agree"
                                                name="agree"
                                                className="form-check-input"
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    {/*was Input type="select" when not using React-Redux-Form*/} <Control.select model=".contactType" name="contactType" 
                                        className="form-control">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    {/*was Input type="textarea" when not using React-Redux-Form*/} <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="12"
                                        ClassName="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;