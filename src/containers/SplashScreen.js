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

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  componentDidMount() {
    this.processAuth(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps)
  }

  processAuth(props) {
    if (props.auth.user != null) {
      if (props.auth.user.uid && props.auth.passcode != null) {
        Actions.lock();
      } else if (props.auth.user.uid && props.auth.passcode == null) {
        Actions.main({ type: 'reset' });
      } else {
        this.wait(1000);
        Actions.register({ type: 'reset' });
      }
    }
  }

  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
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
    backgroundColor: '#202020',
  },
  appTitle: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'HelveticaNeue-Medium',
    paddingBottom: 10,
    letterSpacing: 10
  },
  italicFont: {
    color: '#FFF',
    fontStyle: 'italic',
    paddingBottom: 10
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(SplashScreen);
