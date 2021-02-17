import React from 'react';

//Create a loading spinner that show while we are "waiting" for data server communication to happen
export const Loading = () => { //Functional component
    return ( //Returns a column div that contains a font awesome icon
        <div className="col"> 
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" />
            <p>Loading...</p>
        </div>
    );
};