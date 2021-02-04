import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    constructor(props) { //The constructor and all code in it gets the data from campsites.js and puts it into Main.state. This is called setting the "local state".
        super(props);
        this.state = {
            campsites: CAMPSITES,
        };
    }

    render() {
        
        const HomePage = () => { //Locally scoped component that is only accessable inside the Main component. It is just acting as a wrapper for the Home component now, more will be added later. Set as an arrow function because....
            return (
                <Home />
            );
        }

        return (
            <div>
                <Header />
                <Switch> {/*These route components are acting like the Case keywords in a JS Switch statment. Any routing request that comes through will go through this Switch component until it finds a matching route, if there are none, it will end up at the Redirect component*/}
                    <Route path='/home' component={HomePage} />{/*This will route any traffic that tries to go to the path Home to the HomePage component.*/}
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} /> } /> {/*Pass all info in campsites.JS file down and pass onCampsiteSelect method as props by setting a custom attribute called "campsites".  The Route command: Matches exact path which is directory, render attribute is set up with an arrow function that returns the Directory component.*/}
                    <Redirect to='/home' /> {/*this redirect component acts as a catch all (like default statement in a JS Switch function)*/}
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default Main;