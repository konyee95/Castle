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
    const { container, appTitle, italicFont } = styles;
    return (
      <View style={container}>
        <Text style={appTitle}>
          CASTLE
        </Text>
        <Text style={italicFont}>
          Its smart, its great, its awesome
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
    letterSpacing: 10
  },
  italicFont: {
    color: '#FFF',
    fontStyle: 'italic',
    paddingBottom: 10
  }
}

export default SplashScreen;
