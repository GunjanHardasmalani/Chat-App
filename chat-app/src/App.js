import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import history from './History'
const App = () => {
   
    return (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/chat"  component={Dashboard}/>
              
        </Switch>
    </Router>
    );
}

export default App;