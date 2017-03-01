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
const proceed = <Ionicons name="ios-arrow-dropright" size={40} color="#FFF" style={{ paddingTop: 20 }} />
const done = <Ionicons name="ios-checkmark" size={40} color="#000" />

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import { Spinner, Input } from './../../components/common/';

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
      usernameAvailable: false,
      toggleMode: null,
    };
  }

  componentWillUpdate() {
    LayoutAnimation.linear();
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  toggleMode() {
    if (this.state.toggleMode === null) {
      return <Text style={styles.checkButtonText}>Check Availability</Text>;
    } else if (this.state.toggleMode) {
      return <Spinner size="small" />;
    } else if(!this.state.toggleMode) {
      return <View style={{ backgroundColor: 'transparent' }}>{done}</View>
    }
  }

  processAuth(props) {
    if(props.auth.message === 'Username is available') {
      this.setState({ toggleMode: false, usernameAvailable: true })
    } else if(props.auth.message === 'Username is taken') {
      this.setState({ toggleMode: null });
      Alert.alert('Alert', props.auth.message);
    } else if(props.auth.message === 'User Profile Updated') {
      Alert.alert('User Profile Updated', 'Thank you!', [
        {text: 'OK', onPress: () => Actions.main({ type: 'reset'}) },
      ])
    } else if(props.auth.message === 'Something went wrong') {
      Alert.alert('Something went wrong', 'We will look into it!', [
        {text: 'OK', onPress: () => Actions.main({ type: 'reset'}) },
      ])
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
            { 
              (this.state.usernameAvailable && 
              (this.state.firstName !== '') && 
              (this.state.lastName !== '')) && 
              <TouchableOpacity onPress={() => this.props.createUserRef(this.state.username, this.state.firstName, this.state.lastName)}>
                {proceed} 
              </TouchableOpacity>
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
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
    textAlign: 'center'
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(SetCredentials);
