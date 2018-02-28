import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Welcome from '../../components/Welcome/Welcome';
import Login from '../Login/Login';
import ProjectForm from '../ProjectForm/ProjectForm';
import PropTypes from 'prop-types';


export class Routes extends Component {
  render() {
    const RouteWhenAuthorized = ({component: Component, ...rest}) => (
      <Route {...rest} render={renderProps => (
        this.props.user.loggedIn ? (
          <Component {...renderProps} />
        ) : (
          <Redirect to='/login' />
        )
      ) }/>
    )

    return (
      <div>
        <Switch>
          <Route
            exact path ='/' component={Welcome}
          />
          <Route
            path = '/login' component={Login}
          />
          <RouteWhenAuthorized
            path = '/create' component={ProjectForm}
          />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = store => ({
  user: store.user
})


// Route.propTypes = {
//   component: PropTypes.func
// };

export default withRouter(connect(mapStateToProps)(Routes));