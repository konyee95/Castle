import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

import { Spinner, Input, Button } from './../../components/common/';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Register extends Component {

  onRegisterPress() {
    Alert.alert('Alert', 'button clicked');
  }

  render() {
    const { centerEverything, container, appTitle, appTitleContainer, credentialsContainer, buttonContainer } = styles;
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[container]}>
          <View style={[[centerEverything, credentialsContainer]]}>
            <View style={centerEverything}>
              <Text style={appTitle}>CASTLE</Text>
              <Input
                placeholder="john@gmail.com"
                placeholderTextColor="white"
              />
              <Input
                placeholder="password"
                placeholderTextColor="white"
                secureTextEntry
              />
              <Input
                placeholder="password again"
                placeholderTextColor="white"
                secureTextEntry
              />
              <Button
                buttonPadding={{ paddingTop: 20 }}
                buttonText="REGISTER"
                onPress={this.onRegisterPress}
              />
              <Button
                buttonPadding={{ padding: 3}}
                buttonText="GO BACK"
                onPress={this.onRegisterPress}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  appTitle: {
    color: '#FFF',
    fontSize: 28,
    paddingBottom: 20,
    letterSpacing: 5
  },
  credentialsContainer: {
    flex: 6,
  },
  buttonContainer: {
    flex: 4,
  },
}

export default Register;
