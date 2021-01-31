import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import CampsiteInfo from './CampsiteInfoComponent';

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite}); //This updates the selected campsite's value of the property named "selectedCampiste" to the value of the "campsite" that is passed into the method argument. 
    }

    render() {
        const directory = this.props.campsites.map(campsite => { //Map goes through all the campsites from the local state and will make a new array where each array item contains the below set of JSX elements but using a different campsite for each item. Then the whole array is rendered insid the bootstrap row in the return function below. ".props. was .state., however, when the campsites information was removed from this JS file and moved to the App JS file, campsites information is no longer a state property of this file.  It is passed to this file through the "props" command.
            return (//not the same return from the whole component, only for the arrow function. key= added as the unique key for topmost element as required/recommended by React 
                <div key={campsite.id} className = "col-md-5 m-1">
                    <Card onClick={() => this.onCampsiteSelect(campsite)}> {/*the onClick handler is passed an arrow function which contains a call to the onCampSiteSelect method and passes the current campsite object into that method that we got from the props data.  Whenever someone clicks on a card, that campsite gets set as the selected campsite in the local state. To display that campsites details, a new method must be created which is called renderSelectedCampsite.*/}
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return( //this is the return that sends data from this component to the parent component.  All other returns are just passing data around within this component.
            <div className="container">
                <div className="row">
                    {directory}
                </div>
                <CampsiteInfo campsite={this.state.selectedCampsite} /> {/*Assigns the selectedCampsite object that is in the local state to the attribute named "campsite".  Because the attribute named "campsite" is in the CampsiteInfo react component JSX tag, it is now available to be passed to the CampsiteInfo component as "props" (properties)*/ }
            </div>
        );
    }
}

export default Directory;