import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderCard({item}) {//Purely presentational function component.  Destructure an object named "item" from props right in the parameter list.
    return(
        <Card>
            <CardImg src={item.image} alt={item.name} /> {/*Pulls from the image property and the name property of item object that was passed in  */}
            <CardBody>
                <CardTitle>{item.name}</CardTitle>{/*Pulls from the name property of item object that was passed in */}
                <CardText>{item.description}</CardText>{/*Pulls from the description property of item object that was passed in */}
            </CardBody>
        </Card>
    );
}

function Home(props) {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard item={props.campsite} /> {/*Pass the prop named "item" to the RenderCard function. We passed the featured campsite, promotion, and partner objects into Home component from the Main component. We retrieve it here using props.campsite etc. The featured campsite object gets passed to Home, then gets passed to RenderCard which creates a card from all the properties in the campsite object. */}
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>
        </div>
    );
}

export default Home;