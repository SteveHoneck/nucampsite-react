import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class Directory extends Component {
    render() {
        const directory = this.props.campsites.map(campsite => { //Map goes through all the campsites from the local state and will make a new array where each array item contains the below set of JSX elements but using a different campsite for each item. Then the whole array is rendered insid the bootstrap row in the return function below. ".props. was .state., however, when the campsites information was removed from this JS file and moved to the App JS file, campsites information is no longer a state property of this file.  It is passed to this file through the "props" command.
            return (//not the same return from the whole component, only for the arrow function. key= added as the unique key for topmost element as required/recommended by React 
                <div key={campsite.id} className = "col-md-5 m-1">
                    <Card onClick={() => this.props.onClick(campsite.id)}> {/*Recieve the onClick as a prop from MainComponent.js and pass to it the Id of the campsite that was clicked on.  When a card is clicked on, the onCampsiteSelect method in the MainComponent.js will fire using the campsite's Id & it will store the Id of the campsite that was clicked on in the Main components states selectedCampsite property.*/}
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
            </div>
        );
    }
}

export default Directory;