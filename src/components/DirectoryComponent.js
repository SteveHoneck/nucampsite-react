import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'; //Added for Exercies: Fetch from server

function RenderDirectoryItem({campsite}){//Will be responsible for rendering each card with different campsite details. Fuctional components only accept 1 props object as an argument. Props object has been destructured in the argument list here.
    return (
        <Card>
            <Link to={`/directory/${campsite.id}`}> {/*Create a dynamic link using vanilla JS (for the string that is passed in must use template literal so we can use JS in the sting so backtics are required). Whatever campsite is selected it is going to link to the /directory/ the id that capsite.*/}
                <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} /> {/* Added "baseUrl + " for Exercies: Fetch from server because the image source is now coming from json server*/}
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
} 

function Directory(props) {
    const directory = props.campsites.campsites.map(campsite => { //Map goes through all the campsites from the local state of the MainComponent.js file and will make a new array where each array item contains the below set of JSX elements but using a different campsite for each item. Then the whole array is rendered insid the bootstrap column in the return function below. Campsites is passed to this file from XXXXXX????? through the "props" command.
        return (//not the same return from the whole component, only for the arrow function. key= added as the unique key for topmost element as required/recommended by React 
            <div key={campsite.id} className = "col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} /> {/*Call RenderDirectoryItem functional component and pass it campsite (coming from .map method I think?)*/}
            </div>
        );
    });

    if (props.campsites.isLoading) {//Added due to Thunk, if isLoading is true, return the <Loading> component
        return (//a Bootstrap Grid setup is expected to be returned
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.campsites.errMess) {//Added due to Thunk, if errMess is true, return the errMess object
        return (//a Bootstrap Grid setup is expected to be returned
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    return( //this is the return that sends data from this component to the parent component.  All other returns are just passing data around within this component.
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {directory}
            </div>
        </div>
    );
}

export default Directory;