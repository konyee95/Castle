import React, { Component } from 'react';
import {
  View,
  Text,
  LayoutAnimation
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Spinner } from './../components/common';

class SplashScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { container, appTitle } = styles;
    return (
      <View style={container}>
        <Text style={appTitle}>
          Castle
        </Text>
        <Spinner size="small" />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  appTitle: {
    color: '#FFF',
    fontSize: 28,
    paddingBottom: 10,
    letterSpacing: 5
  }
}

export default SplashScreen;
