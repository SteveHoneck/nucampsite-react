import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => { //Get state from Redux by setting up this function. Take "state" as an argument & return the data arrays as props
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

class Main extends Component {

    render() {
        
        const HomePage = () => { //Changed "state" to "props" for Redux, note may be outdated: Locally scoped component that is only accessable inside the Main component. It is just acting as a wrapper for the Home component now, more will be added later. Set as an arrow function instead of a function declaration because of a feature of arrow functions that has to do with the nature of the "this" keyword inside of arrow functions. Arrow functions inherit the "this" of their parent scope. If we used the function declaration, "this" would not have pointed to the state of the parent class, it would have been undefined.
            return (
                <Home //Changed "state" to "props" for Redux, note may be outdated: Pass in 3 props, one for each item we want to feature on the home page. Can accomplish by using filter on the 3 arrays by evaluating the "featured" property on the objects in the array.  If "featured" is true, the object will be put into a new array (of 1 object) and pass it as props to the HomeComponent.js file's Home component.  Array index [0] is used to pull that object in index 0 out of the filtered array and pass it so that the entire array is not passed (even though the array is only 1 object).
                    campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            );
        };

        const CampsiteWithId = ({match}) => { //Changed "state" to "props" for Redux, note may be outdated: The "this" kewyord needs to refer to the Main component's state. So the function will be set up as an arrow function which recieves "props" from the root component App because Main receives props from App, so destructure the "match" object from Route component out from props in the argument list.
            return(
                <CampsiteInfo //Need to pass selected campsite object and an array of all the comments for the campsite.
                    campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}  //Changed "state" to "props" for Redux, note may be outdated: The full list of campsites is inside Main component's state, it can be accessed with this.state.campsites, then we filter it to look for the campsite object that has the Id that matches what is stored in "match.params.campsiteId" which is stored as a string, so it must be converted to a number using whats called the unary + operator (). Filter returns an array, and we want the campsite object, use [0] to get that entire object. 
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} //Same for comments, but want the whole comment array, so don't use [0].
                />
            );
        }

        return (
            <div>
                <Header />
                <Switch> {/*These route components are acting like the Case keywords in a JS Switch statment. Any routing request that comes through will go through this Switch component until it finds a matching route, if there are none, it will end up at the Redirect component*/}
                    <Route path='/home' component={HomePage} />{/*This will route any traffic that tries to go to the path Home to the HomePage component.*/}
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} /> } /> {/*Changed "state" to "props" for Redux, note may be outdated: Pass all info in campsites.JS file down as props by setting a custom attribute called "campsites".  The Route command: Matches exact path which is directory, render attribute is set up with an arrow function that returns the Directory component. Render & arrow function are needed because we are passing props within a Routing component. Render & arrow are a good syntax to do this by.  So this is saying when encountering the path '/directory', render the directory component & pass it props. As opposed the the Route for /home and /contactus which use "component=" to directly render the specified Component without passing it any state data as props*/}
                    <Route exact path='/contactus' component={Contact} /> {/*Watch the browser address bar and whenever the address bar matches contactus (address bar is changed by the corresponding <Link> component), then show the Contact component.*/}
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} /> {/* Colon tells the router what follows the forward slash is going to be a parameter, and then it takes whatever that is and puts it inside the property "campsiteId". Then the Route component itself stores an object named "match" in its state which has as a property and object named "params", the campsiteId gets stored as a property of that "params" object. Make the route render a component "CampsiteWithId", the Routes "match" object gets passed to the "CampsiteWithId" component automtically.*/} 
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } /> {/*Changed "state" to "props" for Redux, note may be outdated: Watch the browser address bar and whenever the address bar matches aboutus (address bar is changed by the corresponding <Link> component), then render the About component and pass all info in partners.JS file down as props by setting a custom attribute called "partners".*/}
                    <Redirect to='/home' /> {/*this redirect component acts as a catch all (like default statement in a JS Switch function)*/}
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps)(Main));  //Add connect()(). All this allows the Main component to take it's state from the Redux store. Wrap export withRouter so that ReactRouter still works with the Redux changes.