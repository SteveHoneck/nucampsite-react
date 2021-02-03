import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component {
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
                <Navbar dark sticky="top"> {/* "dark" and "sticky" attributes are from ReactStrap documentation. */}
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
            </React.Fragment>    
        );
    }
}

export default Header;