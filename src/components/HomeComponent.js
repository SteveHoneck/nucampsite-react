import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'; //Added for Exercies: Fetch from server
import { FadeTransform } from 'react-animation-components'; //Allows us to add both fade and transform effects using the same component



function RenderCard({item, isLoading, errMess}) {//Purely presentational function component.  Destructure objects named "item, isLoading, errMess" from props right in the parameter list.
    if (isLoading) { //Since using Thunk, we want to show the LoadingComponent if you are still loading data, the errMsg if it failed, and only render the data if we have it. if truthy, show the <Loading> component.
        return <Loading />;
    }
    if (errMess) { //if truthy, show errMess
        return <h4>{errMess}</h4>;
    }
    return( //if neither are truthy, return card component because we can assume campsites data has loaded correctly
        <FadeTransform //
        in //"in" attribute is boolean that tells component to run transition when being mounted
        transformProps={{ //2 sets of {}, becuause first is to embed JS in JSX and second is to make the object
            exitTransform: 'scale(0.5) translateY(50%)' //transition from initial scale of 50% to the normal value & move vertically. 
        }}>
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name} /> {/*Pulls from the image property and the name property of item object that was passed in. Tacks the text of the image property to the end of "baseUrl" in order to get the image from the json server  */}
            <CardBody>
                <CardTitle>{item.name}</CardTitle>{/*Pulls from the name property of item object that was passed in */}
                <CardText>{item.description}</CardText>{/*Pulls from the description property of item object that was passed in */}
            </CardBody>
        </Card>
        </FadeTransform>
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
                    <RenderCard 
                        item={props.promotion}
                        isLoading={props.promotionLoading} //Can be passed to the RenderCard component, done for Exercise: Fetch from Server
                        errMess={props.promotionErrMess} //Can be passed to the RenderCard component, done for Exercise: Fetch from Server
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.partner} 
                        isLoading={props.partnerLoading}
                        errMess={props.partnerErrMess}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;