import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    
    constructor(props) { //Items must be added to State to help with the NavbarToggler 
        super(props);

        this.toggleNav = this.toggleNav.bind(this);//Binds the event handler using a JS method called .bind() to bind it to the component. This ensures that when toggleNav is called then the "this" keyword inside it referrs correctly to the component.
        this.state = { 
            isNavOpen: false //This is an object with the property isNavOpen initilized to false
        };
    }

    toggleNav() { //Method that will handle the when the navbar handler buttons are clicked. When this function is triggered, it will change the state of isNavOpen object to the opposite of it's current state
        this.setState({
            isNavOpen: !this.state.isNavOpen //Sets state of isNavOpen to the opposite (accomplished by the ! operator) of the current state of isNavOpen
        });
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
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>    
        );
    }
}

export default Header;