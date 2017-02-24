import React, { Component } from 'react';
import { View, Text, StatusBar, Alert } from 'react-native';

import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './actions';

import SplashScreen from './containers/SplashScreen';
import LockScreen from './containers/passcodeContainers/LockScreen';
import Register from './containers/auth/Register';
import Login from './containers/auth/Login';

import Home from './containers/tabContainers/Home';
import Account from './containers/tabContainers/Account';
import Calculator from './containers/tabContainers/Calculator';
import ManagePasscode from './containers/passcodeContainers/ManagePasscode';

class RouterComponent extends Component {

  componentWillMount() {
    this.props.listenToUser();
  }

  render() {
    return (
      <Router
        hideNavBar={true}>
        <Scene key="auth" initial>
          <Scene key="splash" component={SplashScreen} initial />
          <Scene key="login" component={Login} />
          <Scene key="register" component={Register}  />
          <Scene key="lock" direction="vertical" >
            <Scene key="lockScreen" schema="modal" component={LockScreen} panHandlers={null} />
          </Scene>
        </Scene>
        <Scene key="main">
          <Scene key="home" component={Home} initial />
          <Scene key="account" component={Account} />
          <Scene key="calculator" component={Calculator} />
          <Scene key="managePasscode" schema="modal" component={ManagePasscode} direction="horizontal" />
        </Scene>
      </Router>
    )
  }
}

export default connect(null, actions)(RouterComponent);
