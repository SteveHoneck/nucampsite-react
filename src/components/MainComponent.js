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
import { actions } from 'react-redux-form'; //Imported to make an action creator named "actions.reset" available to us.
import { postComment, fetchCampsites, fetchComments, fetchPromotions } from '../redux/ActionCreators'; //Imports the functions from ActionCreators


const mapStateToProps = state => { //Get state from Redux by setting up this function. Take "state" as an argument & return the data arrays as props
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = { //Added to use the ActionCreators. Can be set up as a function or as an object (as seen here).
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),  //"mapDispatchToProps" is constant with one property of "postComment" that has an arrow function with the paramater list of "campsiteId, rating, author, text" and the arrow function's body calls the Action Creator "postComment" & passes in the data from the parameter list.
    fetchCampsites: () => (fetchCampsites()), //"mapDispatchToProps" is constant with another property of "fetchCampsites". This property is an Arrow function with no arguments that calls the "fetchCampsites" action creator. The "fetchCampsites" action creator is now available to the MainComponent as props.
    resetFeedbackForm: () => (actions.reset('feedbackForm')), //Added for React Redux Form. "actions.reset" is built in method/function from react-redux-form library
    fetchComments: () => (fetchComments()), //Arrow function that calls the "fetchComments" action creator. 
    fetchPromotions: () => (fetchPromotions()) //Arrow function that calls the "fetchPromotions" action creator
};

class Main extends Component {

    //Want to fetch the campsite, comments, and promotions data as soon as the Main component is rendered to the DOM, so the best place to do that is in a special React method "componentDidMount". Built in React Lifecycle Method (certian points when it gets created, update, and removed. Each point has certain method associated with it).
    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions(); 
    }

    render() {
        
        const HomePage = () => { //Changed "state" to "props" for Redux, note may be outdated: Locally scoped component that is only accessable inside the Main component. It is just acting as a wrapper for the Home component now, more will be added later. Set as an arrow function instead of a function declaration because of a feature of arrow functions that has to do with the nature of the "this" keyword inside of arrow functions. Arrow functions inherit the "this" of their parent scope. If we used the function declaration, "this" would not have pointed to the state of the parent class, it would have been undefined.
            return (
                <Home //Changed "state" to "props" for Redux, note may be outdated: Pass in 3 props, one for each item we want to feature on the home page. Can accomplish by using filter on the 3 arrays by evaluating the "featured" property on the objects in the array.  If "featured" is true, the object will be put into a new array (of 1 object) and pass it as props to the HomeComponent.js file's Home component.  Array index [0] is used to pull that object in index 0 out of the filtered array and pass it so that the entire array is not passed (even though the array is only 1 object).
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} //"this.props.campsites" was holding just an array before using Thunk. Now using Thunk it holds "isLoading", "errMess", and campsites array. "campsites.campsites." is getting the campsites array out of an object also named campsites.
                    campsitesLoading={this.props.campsites.isLoading} //Due to Thunk Pass the "isLoading" property of the campsite state object as props
                    campsitesErrMess={this.props.campsites.errMess}//Due to Thunk Pass the "errMess" property of the campsite state object as props
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} //first promotions points to the promotions object then the 2nd promotions points to the promotions array inside that object
                    promotionLoading={this.props.promotions.isLoading} //added for exercise: fetch from server
                    promotionErrMess={this.props.promotions.errMess} //added for exercise: fetch from server
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            );
        };

        const CampsiteWithId = ({match}) => { //Changed "state" to "props" for Redux, note may be outdated: The "this" kewyord needs to refer to the Main component's state. So the function will be set up as an arrow function which recieves "props" from the root component App because Main receives props from App, so destructure the "match" object from Route component out from props in the argument list.
            return(
                <CampsiteInfo //Need to pass selected campsite object and an array of all the comments for the campsite.
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}  //Changed "state" to "props" for Redux, note may be outdated: The full list of campsites is inside Main component's state, it can be accessed with this.state.campsites, then we filter it to look for the campsite object that has the Id that matches what is stored in "match.params.campsiteId" which is stored as a string, so it must be converted to a number using whats called the unary + operator (). Filter returns an array, and we want the campsite object, use [0] to get that entire object. Due to Thunk, "campsites.campsites." is getting the campsites array out of an object also named campsites.
                    isLoading={this.props.campsites.isLoading} //Due to Thunk Pass the "isLoading" property of the campsite state object as props
                    errMess={this.props.campsites.errMess}//Due to Thunk Pass the "errMess" property of the campsite state object as props
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} //Same for comments, but want the whole comment array, so don't use [0].
                    commentsErrMess={this.props.comments.errMess} //added for exercise: fetch from server
                    postComment={this.props.postComment} //Pass the "postComment" function to this component as a prop because of the "mapDispatchToProps" in the "connect" function.
                />
            );
        }

        return (
            <div>
                <Header />
                <Switch> {/*These route components are acting like the Case keywords in a JS Switch statment. Any routing request that comes through will go through this Switch component until it finds a matching route, if there are none, it will end up at the Redirect component*/}
                    <Route path='/home' component={HomePage} />{/*This will route any traffic that tries to go to the path Home to the HomePage component.*/}
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} /> } /> {/*Changed "state" to "props" for Redux, note may be outdated: Pass all info in campsites.JS file down as props by setting a custom attribute called "campsites".  The Route command: Matches exact path which is directory, render attribute is set up with an arrow function that returns the Directory component. Render & arrow function are needed because we are passing props within a Routing component. Render & arrow are a good syntax to do this by.  So this is saying when encountering the path '/directory', render the directory component & pass it props. As opposed the the Route for /home and /contactus which use "component=" to directly render the specified Component without passing it any state data as props*/}
                    <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} /> {/*Watch the browser address bar and whenever the address bar matches contactus (address bar is changed by the corresponding <Link> component), then show the Contact component. Pass the "resetFeedbackForm" to the Contact component as a prop*/}
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} /> {/* Colon tells the router what follows the forward slash is going to be a parameter, and then it takes whatever that is and puts it inside the property "campsiteId". Then the Route component itself stores an object named "match" in its state which has as a property and object named "params", the campsiteId gets stored as a property of that "params" object. Make the route render a component "CampsiteWithId", the Routes "match" object gets passed to the "CampsiteWithId" component automtically.*/} 
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } /> {/*Changed "state" to "props" for Redux, note may be outdated: Watch the browser address bar and whenever the address bar matches aboutus (address bar is changed by the corresponding <Link> component), then render the About component and pass all info in partners.JS file down as props by setting a custom attribute called "partners".*/}
                    <Redirect to='/home' /> {/*this redirect component acts as a catch all (like default statement in a JS Switch function)*/}
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));  //Add connect()(). All this allows the Main component to take it's state from the Redux store. "mapDispatchToProps" was added as the second argument in order to make the "addComment" action creator function available inside the MainComponent as a prop. Wrap export withRouter so that ReactRouter still works with the Redux changes.