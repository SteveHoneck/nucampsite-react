import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    constructor(props) { //The constructor and all code in it gets the data from campsites.js and puts it into Main.state. This is called setting the "local state".
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId}); //This updates the selected campsite's value of the property named "selectedCampiste" to the value of the "campsiteId" that is passed into the method argument. 
    }


    render() {
        return (
            <div>
                <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="/">NuCamp</NavbarBrand>
                </div>
                </Navbar>
                <Directory campsites={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/> {/*Pass all info in campsites.JS file down and pass onCampsiteSelect method as props by setting a custom attribute called "campsites" and "onClick"*/}
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} /> {/*Assigns the entire array object from campsites.js that is in the local state to the attribute named "campsite".  Because the attribute named "campsite" is in the CampsiteInfo react component JSX tag, it is now available to be passed to the CampsiteInfo component as "props" (properties).  Filter through the entire array object from campsites.js to find the object with the Id that matches the "campsiteId" that is currently in state for the the "selectedCampsite" property. The filter method should return an array with only 1 object in it. The CampsiteInfo component is expecting an object, not an array, so extract the object by using [0] & it will send the 1st object in the array.*/ }
            </div>
        );
    };
}

export default Main;