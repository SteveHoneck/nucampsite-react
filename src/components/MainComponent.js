import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';


class Main extends Component {
    constructor(props) { //The constructor and all code in it gets the data from campsites.js and other .js files and puts it into Main.state. This is called setting the "local state".
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
        };
    }

    render() {
        
        const HomePage = () => { //Locally scoped component that is only accessable inside the Main component. It is just acting as a wrapper for the Home component now, more will be added later. Set as an arrow function instead of a function declaration because of a feature of arrow functions that has to do with the nature of the "this" keyword inside of arrow functions. Arrow functions inherit the "this" of their parent scope. If we used the function declaration, "this" would not have pointed to the state of the parent class, it would have been undefined.
            return (
                <Home //Pass in 3 props, one for each item we want to feature on the home page. Can accomplish by using filter on the 3 arrays by evaluating the "featured" property on the objects in the array.  If "featured" is true, the object will be put into a new array (of 1 object) and pass it as props to the HomeComponent.js file's Home component.  Array index [0] is used to pull that object in index 0 out of the filtered array and pass it so that the entire array is not passed (even though the array is only 1 object).
                    campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.state.partners.filter(partner => partner.featured)[0]}
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch> {/*These route components are acting like the Case keywords in a JS Switch statment. Any routing request that comes through will go through this Switch component until it finds a matching route, if there are none, it will end up at the Redirect component*/}
                    <Route path='/home' component={HomePage} />{/*This will route any traffic that tries to go to the path Home to the HomePage component.*/}
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} /> } /> {/*Pass all info in campsites.JS file down as props by setting a custom attribute called "campsites".  The Route command: Matches exact path which is directory, render attribute is set up with an arrow function that returns the Directory component. Render & arrow function are needed because we are passing props within a Routing component. Render & arrow are a good syntax to do this by.  So this is saying when encountering the path '/directory', render the directory component & pass it props. As opposed the the Route for /home and /contactus which use "component=" to directly render the specified Component without passing it any state data as props*/}
                    <Route exact path='/contactus' component={Contact} /> {/*Watch the browser address bar and whenever the address bar matches contactus, then show the Contact component.*/}
                    <Redirect to='/home' /> {/*this redirect component acts as a catch all (like default statement in a JS Switch function)*/}
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default Main;