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

import * as Progress from 'react-native-progress';

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

  animateProgressBar() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 3;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  toggleMode() {
    if (!this.state.toggleMode) {
      return (
        <Button
          buttonPadding={{ paddingTop: 25 }}
          buttonText="REGISTER FREE"
          onPress={() => this.onRegisterPress()}
        />
      )
    } else {
      return (
        <Progress.Bar
          style={{ marginTop: 25}}
          color="#FFF"
          animated={true}
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
        />
      )
    }
  }

  processAuth(props) {
    // console.log(props.auth);
    if (props.auth.user != null) {
      if (props.auth.user.uid) {
        this.setState({ toggleMode: false });
        Alert.alert('Welcome!', 'Good to see you here!', [{text: 'OK', onPress: () => Actions.main({ type: 'reset' })}]);
      }
    }

    if (props.auth.error) {
      this.setState({
        email: '',
        password: '',
        toggleMode: false
      });
      Alert.alert('Alert', props.auth.error,
      [
        {text: 'OK', onPress: () => this.props.clearErrorMessage()},
      ]);
    }

  }

  renderCheckButton() {
    const { centerEverything, checkButton, checkButtonText } = styles;
    if(this.state.username !== '') {
      return (
        <TouchableOpacity
          style={[checkButton, centerEverything]}>
          <Text style={checkButtonText}>Check Availability</Text>
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
