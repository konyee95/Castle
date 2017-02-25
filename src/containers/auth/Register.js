import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import * as Progress from 'react-native-progress';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import { Spinner, Input, Button } from './../../components/common/';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      toggleMode: false,
      progress: 0,
      indeterminate: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

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

  onRegisterPress() {
    const { email, password } = this.state;
    if (email === '' || password === '') {
      Alert.alert('Alert', 'Please enter your credentials')
    } else {
      if (!this.validateEmail(email)) {
        Alert.alert('Message', 'Please enter a valid email address')
      } else {
        this.setState({
          toggleMode: true
        });
        this.props.registerUser(email, password);
      }
    }
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

  render() {
    const { centerEverything, container, appTitle, appTitleContainer, credentialsContainer, buttonContainer, additionalBox, fontColorWhite, fontBold } = styles;
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
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              />
              <Input
                inputPadding={{ padding: 3 }}
                placeholder="password"
                placeholderTextColor="white"
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                secureTextEntry
              />
              {/* <Input
                inputPadding={{ padding: 3 }}
                placeholder="password confirmation"
                placeholderTextColor="white"
                secureTextEntry
              /> */}
              {this.toggleMode()}
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
    fontSize: 36,
    fontFamily: 'HelveticaNeue-Medium',
    paddingBottom: 60,
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(Register);
