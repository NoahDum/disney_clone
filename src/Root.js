import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import App from './App';
import Company from './components/Company';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/company/:id' component={Company} />
            <Route path='/movie/:id' component={Movie} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export default Root