import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';



function RenderCard({item, isLoading, errMess}) {//Purely presentational function component.  Destructure objects named "item, isLoading, errMess" from props right in the parameter list.
    if (isLoading) { //Since using Thunk, we want to show the LoadingComponent if you are still loading data, the errMsg if it failed, and only render the data if we have it. if truthy, show the <Loading> component.
        return <Loading />;
    }
    if (errMess) { //if truthy, show errMess
        return <h4>{errMess}</h4>;
    }
    return( //if neither are truthy, return card component because we can assume campsites data has loaded correctly
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
                    <RenderCard 
                        item={props.campsite} //Pass the prop named "item, isLoading, ErrMess" to the RenderCard function. We passed the featured campsite, promotion, and partner objects into Home component from the Main component. We retrieve it here using props.campsite etc. The featured campsite object gets passed to Home, then gets passed to RenderCard which creates a card from all the properties in the campsite object.                         
                        isLoading={props.campsitesLoading} // Main component passes "campsitesLoading={this.props.campsites.isLoading}" to <Home>. Here it is renamed "isLoading" and passed to <RenderCard>. BUT WHY NAME IT campsitesLoading IN THE FIRST PLACE JUST NAME IT isLoading???????????????????
                        errMess={props.campsitesErrMess} //same as above
                    /> 
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