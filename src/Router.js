import React, { Component } from 'react';
import { View, Text, StatusBar, Alert } from 'react-native';

import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import SplashScreen from './containers/SplashScreen';
import Register from './containers/auth/Register';

import Home from './containers/tabContainers/Home';

class RouterComponent extends Component {
  render() {
    return (
      <Router
        hideNavBar={true}>
        <Scene key="auth" initial>
          <Scene key="splash" component={SplashScreen}  />
          <Scene key="register" component={Register} initial />
        </Scene>
        <Scene key="main">
          <Scene key="home" component={Home} />
        </Scene>
      </Router>
    )
  }
}

const styles = {

}

export default RouterComponent;
