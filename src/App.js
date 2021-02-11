import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';

const store = ConfigureStore(); //In configureStore.js, that function returns the Redux store, the return value is captured here in this "store" const.

class App extends Component {
    render() {
      return (
        <Provider store={store}> {/*Makes the Redux store available to all connected components that are children of App*/}
          <BrowserRouter>
            <div className="App">
                <Main /> 
            </div>
          </BrowserRouter>
        </Provider>  
      );
    };
}

export default App;
