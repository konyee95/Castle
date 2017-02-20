import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Spinner, Input, Button } from './../../components/common/';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Register extends Component {

  onRegisterPress() {
    Alert.alert('Alert', 'button clicked');
  }

  render() {
    const { testShit, centerEverything, container, appTitle, appTitleContainer, credentialsContainer, buttonContainer, additionalBox, fontColorWhite, fontBold } = styles;
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[container]}>
          <View style={[[centerEverything, credentialsContainer]]}>
            <View style={centerEverything}>
              <Text style={appTitle}>CASTLE</Text>
              <Input
                inputPadding={{ padding: 3 }}
                placeholder="john@gmail.com"
                placeholderTextColor="white"
              />
              <Input
                inputPadding={{ padding: 3 }}
                placeholder="password"
                placeholderTextColor="white"
                secureTextEntry
              />
              <Input
                inputPadding={{ padding: 3 }}
                placeholder="password confirmation"
                placeholderTextColor="white"
                secureTextEntry
              />
              <Button
                buttonPadding={{ paddingTop: 25 }}
                buttonText="REGISTER FREE"
                onPress={this.onRegisterPress}
              />
              <View style={[additionalBox]}>
                <Text style={fontColorWhite}>Already have an account? </Text>
                <TouchableOpacity onPress={() => Actions.login()}>
                  <Text style={[fontColorWhite, fontBold]}>
                    Login here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  testShit: {
    borderColor: 'red',
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
  appTitle: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'HelveticaNeue-Medium',
    paddingBottom: 20,
    letterSpacing: 7,
  },
  credentialsContainer: {
    flex: 6,
  },
  buttonContainer: {
    flex: 4,
  },
  additionalBox: {
    width: deviceWidth*0.75,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16
  },
  fontColorWhite: {
    color: '#FFF'
  },
  fontBold: {
    fontWeight: 'bold'
  }
}

export default Register;
