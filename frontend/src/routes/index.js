import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

import DashBoard from '~/pages/DashBoard';
import Profile from '~/pages/Profile';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/register" component={SignUp} />

            <Route path="/dashboard" component={DashBoard} isPrivate />
            <Route path="/profile" component={Profile} isPrivate />
        </Switch>
    );
}
