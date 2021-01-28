import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

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

    renderSelectedCampsite(campsite) { //This method will display the campsites details to the view.  It is passed in the campsite object
        if (campsite) { //this makes sure the campsite has an object in it becusue this condition would return false if the campsite value was null or undefined
            return (//If campsite has and object, if statement will return true and enter the if block. Inside the if block, we return a card that includes the campsite image, name, and description
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            )
        } 
        return <div />//if campsite value was null, an empty div will be returned
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
                <div className="row">
                    <div className="col-md-5 m-1">
                        {this.renderSelectedCampsite(this.state.selectedCampsite)} {/*call the renderSelectedCampsite method and pass it the campsite object stored in the selectedCampsite property of state*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Directory;