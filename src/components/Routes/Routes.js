import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';


const Routes = () => {
  return (
    <div>
      <Switch>
        <Route
          exact path ='/' component={Welcome}
        />
      </Switch>
    </div>
  )
}

Route.propTypes = {
  component: PropTypes.func
}

export default Routes;