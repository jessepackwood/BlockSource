import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Login from '../../containers/Login/Login';
import PropTypes from 'prop-types';


const Routes = () => {
  return (
    <div>
      <Switch>
        <Route
          exact path ='/' component={Welcome}
        />
        <Route
          path = '/login' component={Login}
        />
      </Switch>
    </div>
  )
}

Route.propTypes = {
  component: PropTypes.func
}

export default Routes;