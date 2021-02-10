import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    
    constructor(props) { //Items must be added to State to help with the NavbarToggler 
        super(props);
        this.state = { 
            isNavOpen: false, //This is an object with the property isNavOpen initilized to false
            isModalOpen: false//Add boolean property in the component's state so that the Modal can be opened. Will keep track if modal is open or colsed.
        };

        this.toggleNav = this.toggleNav.bind(this);//Binds the event handler using a JS method called .bind() to bind it to the component. This ensures that when toggleNav is called then the "this" keyword inside it referrs correctly to the component.
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() { //Method that will handle when the navbar handler buttons are clicked. When this function is triggered, it will change the state of isNavOpen property to the opposite of it's current state
        this.setState({
            isNavOpen: !this.state.isNavOpen //Sets state of isNavOpen to the opposite (accomplished by the ! operator) of the current state of isNavOpen
        });
    } 

    toggleModal() { //Method that will handle when the modal handler button is clicked. When this function is triggered, it will change the state of isModalOpen property to the opposite of it's current state
        this.setState({
            isModalOpen: !this.state.isModalOpen //Sets state of isModalOpen to the opposite (accomplished by the ! operator) of the current state of isModalOpen
        });
    } 

    handleLogin(event) { //not building a backend for authentication, so all this will do is alert us that it's been submitted
        alert(`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`); //These properties were not set in the state like done in a controlled form. They will be pulled using React "innerRef" that is added to the <Input> tags.
        this.toggleModal(); //close the modal
        event.preventDefault(); //prevents the entire page from being rerendered 
    }   

    render() {
        return(
            <React.Fragment> {/*This return statement is returning two JSX elements, which is not allowed by return(). Could wrap both in a <div> but that creates an extra DOM node. Ues <React.Fragment>, it does same thing, but does not create a new DOM node. Shorthand is <>JSX Elements</>*/}
                <Jumbotron fluid>
                    <div className="container">
                        <div classname="row">
                            <div classname="col">
                                <h1>NuCamp</h1>
                                <h2>a better way to camp</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="md"> {/* "dark" and "sticky" attributes are from ReactStrap documentation. "expand" attribute is from Bootstrap? (I think the video is wrong because if it was from Bootstrap it would be called with className=) */}
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"><img src="/assets/images/logo.png" height="30" width="30" alt="NuCamp Logo" /></NavbarBrand> {/* mr-auto helps with alignment.  Logo picture is from public folder which is special who's contents are available at the root level of the App. Don't need to specify the public folder in the image path.*/}
                        <NavbarToggler onClick={this.toggleNav} /> {/* This component creates the toggler button. We pass it an onClick event handler as a prop with the value of this.toggleNav. This makes it so a click on the toggler button will trigger the toggleNav method.*/}
                        <Collapse isOpen={this.state.isNavOpen} navbar> {/*Add navigation links inside this Collapse component.  Set the Collapse component's isOpen attribute to so that is false or true depending on current state of isNavOpen. Must be given "navbar" attribute as well as per the Reactstrap docs.*/} 
                            <Nav navbar> {/*Nav component with "navbar" attribute. Set up 4 nav items inside.*/}
                                <NavItem>
                                    <NavLink className="nav-link" to="/home"> {/*"to" attribute sets up routing location*/}
                                        <i className="fa fa-home fa-lg"/> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/directory"> 
                                        <i className="fa fa-list fa-lg"/> Directory
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus"> 
                                        <i className="fa fa-info fa-lg"/> About
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus"> 
                                        <i className="fa fa-address-card fa-lg"/> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <span className="navbar-text ml-auto"> {/*These classes will give the button the same text styles as the navigation links and align it horizontall to the right.*/}
                                <Button outline onClick={this.toggleModal}> {/*Give the button an onClick event handler so it will call the toggleModal() method*/}
                                    <i className="fa fa-sign-in fa-lg" /> Login
                                </Button>
                            </span>
                        </Collapse>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> {/*"isOpen" is a built in attribute to <Modal>. When state of isModalOpen is false, modal will be closed, etc. "toggle" is a bulit in attribute & we set it to the toggleModal method created in code above*/}
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>{/*Adding "toggle" here will automatically provide a way to close the modal when it is open*/}
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}> {/*Set up Form component and give it the event handler onSubmit that is tied into the handlLogin method we created*/}
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={input => this.username = input} /> {/*Add an "innerRef" attribute set to a call back funciton to which the value of the input field is passed. Define a property for each one (one what?) called "this.username" and set the value of that property to the value of the input field. "input" must be a built in attribute to <Input>*/}
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={input => this.password = input} />
                            </FormGroup>
                            <FormGroup check> {/*ReactStrap requires that the "check" attribute be added to FormGroup and Label if you are making a checkbox*/}
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={input => this.remember = input} /> {/*<Input> goes inside the label tag, because of that you dont need an the matching pair of Id for the input abd HTMLfor on the <Label>*/}
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>    
        );
    }
}

export default Header;