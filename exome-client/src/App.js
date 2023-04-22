import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './component/privateRoute';
import { HomePage } from './homePage/homePage';
import { LoginPage } from './loginPage/loginPage';
import { SamplePage } from './samplePage/samplePage';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
        <div>
            <Router>
                <div>
                    <PrivateRoute exact path="/home" component={HomePage} />
                    <PrivateRoute exact path="/" component={HomePage} />

                    <PrivateRoute path="/sample/:id" component={SamplePage}/> 

                    <Route path="/login" component={LoginPage} />
                </div>
            </Router>
        </div>
  );
}

export default App;
