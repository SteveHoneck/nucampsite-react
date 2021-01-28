import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './components/DirectoryComponent';
import { CAMPSITES } from './shared/campsites';
import './App.css';

class App extends Component {
    constructor(props) { //The constructor and all code in it gets the data from campsites.js and puts it into App.state. This is called setting the "local state".
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    render() {
      return (
          <div className="App">
              <Navbar dark color="primary">
              <div className="container">
                  <NavbarBrand href="/">NuCamp</NavbarBrand>
              </div>
              </Navbar>
              <Directory campsites={this.state.campsites} /> {/*Pass it down as props by setting a custom attribute called "campsites"*/}
          </div>
      );
  }
}

export default App;
