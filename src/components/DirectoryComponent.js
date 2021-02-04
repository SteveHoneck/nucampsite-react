import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderDirectoryItem({campsite}){//Will be responsible for rendering each card with different campsite details. Fuctional components only accept 1 props object as an argument. Props object has been destructured in the argument list here.
    return (
        <Card>
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
} 

function Directory(props) {
    const directory = props.campsites.map(campsite => { //Map goes through all the campsites from the local state of the MainComponent.js file and will make a new array where each array item contains the below set of JSX elements but using a different campsite for each item. Then the whole array is rendered insid the bootstrap column in the return function below. Campsites is passed to this file through the "props" command.
        return (//not the same return from the whole component, only for the arrow function. key= added as the unique key for topmost element as required/recommended by React 
            <div key={campsite.id} className = "col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} /> {/*Call RenderDirectoryItem functional component and pass it campsite (coming from .map method I think?)*/}
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

export default Directory;