import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';
import DashBoard from './DashBoard';

function Routes() {
    return (
        <div>
            <Switch>
                <Route 
                path="/"
                exact
                component={HomePage}/>
        
                <Route 
                path="/dashboard"
                exact
                component={DashBoard}/>
            </Switch>
        </div>
        );
    }
    
export default Routes;