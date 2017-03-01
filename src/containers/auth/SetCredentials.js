import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import { Spinner, Input, Button } from './../../components/common/';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class SetCredentials extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      toggleMode: false,
      progress: 0,
      indeterminate: true,
      complete: false
    };
  }

  componentWillUpdate() {
    LayoutAnimation.linear();
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  toggleMode() {
    if (!this.state.toggleMode) {
      return (
        <Text style={styles.checkButtonText}>Check Availability</Text>
      )
    } else {
      return (
        <Spinner size="small" />
      )
    }
  }

  processAuth(props) {
    if(props.auth.error === 'Username is available') {
      Alert.alert('Alert', 'OK')
    }
  }

  renderCheckButton() {
    const { centerEverything, checkButton, checkButtonText } = styles;
    if(this.state.username !== '') {
      return (
        <TouchableOpacity
          style={[checkButton, centerEverything]}
          onPress={() => {
            this.setState({ toggleMode: true });
            this.props.checkUserName(this.state.username);
          }}>
          {this.toggleMode()}
        </TouchableOpacity>
      )
    }
  }

  renderProceedButton() {
    
  }

  render() {
    const { testShit, centerEverything, container, upperContainer, bottomContainer, appTitle, appTitle2 } = styles;
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[container]}>
          <View style={[upperContainer]}>
            <Text style={appTitle}>Hello there!</Text>
            <Text style={[appTitle2]}>Let's get you set up!</Text>
          </View>
          <View style={[bottomContainer]}>
            <View style={[{ flexDirection: 'row' }, centerEverything] }>
              <Input
                propWidth={{ width: deviceWidth*0.5 }}
                inputPadding={{ padding: 3 }}
                placeholder="Username"
                placeholderTextColor="white"
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username}
              />
              {this.renderCheckButton()}
            </View>
            <Input
              propWidth={{ width: deviceWidth*0.5 }}
              inputPadding={{ padding: 3 }}
              placeholder="First name"
              placeholderTextColor="white"
              onChangeText={(firstName) => this.setState({ firstName })}
              value={this.state.firstName}
            />
            <Input
              propWidth={{ width: deviceWidth*0.5 }}
              inputPadding={{ padding: 3 }}
              placeholder="Last name"
              placeholderTextColor="white"
              onChangeText={(lastName) => this.setState({ lastName })}
              value={this.state.lastName}
            />
            { this.state.complete &&
              <Ionicons name="ios-arrow-dropright" size={40} color="#FFF" style={{ paddingTop: 20 }} />
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  testShit: {
    borderColor: 'white',
    borderWidth: 2
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  upperContainer: {
    flex: 4,
    justifyContent: 'center',
    paddingLeft: 40
  },
  bottomContainer: {
    flex: 6,
    alignItems: 'center'
  },
  appTitle: {
    color: '#FFF',
    fontSize: Math.round(deviceWidth*0.07),
    fontFamily: 'HelveticaNeue-Medium',
    letterSpacing: 3,
  },
  appTitle2: {
    color: '#FFF',
    fontSize: Math.round(deviceWidth*0.045),
    fontFamily: 'HelveticaNeue-Thin',
    letterSpacing: 2,
    paddingTop: 10,
  },
  checkButton: {
    backgroundColor: '#FFF',
    height: 40,
    width: 90
  },
  checkButtonText: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center'
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(SetCredentials);
