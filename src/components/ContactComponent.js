import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

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
                                    /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                    />
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
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