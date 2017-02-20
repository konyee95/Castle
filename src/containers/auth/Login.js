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

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonState: 'signIn',
      error: null
    }

    this.buttonStates = {
      signIn: {
        text:'SIGN IN',
        onPress: () => {
          this.loginUser();
        }
      },
      loading: {
        spinner: true,

      }
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  loginUser() {
    const { email, password } = this.state;
    if (!this.validateEmail(email)) {
      Alert.alert('Message', 'Please enter a valid email type')
    } else {
      this.setState({ buttonState: 'loading' });
      // this.props.loginUser(email, password);
    }
  }

  render() {
    const { centerEverything, container, textColorWhite, appTitle, appTitleContainer, credentialsContainer, buttonContainer } = styles;
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[container]}>
          <View style={[[centerEverything, credentialsContainer]]}>
            <View style={[centerEverything]}>
              <Text style={[appTitle, textColorWhite]}>CASTLE</Text>
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
              <Button
                buttonPadding={{ paddingTop: 25 }}
                buttonText="LOGIN"
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
  testShit: {
    borderWidth: 2,
    borderColor: 'blue'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  textColorWhite: {
    color: '#FFF'
  },
  appTitle: {
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

export default Login;
