import React, { Component } from 'react';
import {
  Alert,
  Image,
  View,
  Text,
} from 'react-native';

import Calculator from './Calculator';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import { Button, Label } from './../../components/common';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Account extends Component {

  onLogout() {
    Alert.alert('Alert', 'Log out?',
      [
        {text: 'cancel', onPress: () => console.log('cancel log out')},
        {text: 'OK', onPress: () => {
            this.props.logoutUser();
            Actions.auth({ type: 'reset' })
          }
        }
      ]
    )
  }

  render() {
    const { testShit, centerEverything, container, upperContainer, bottomContainer, helFont, accountPicture, accountText,
      actionButtonContainer, actionButton} = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[upperContainer]}>
          <Image
            source={require('./../../img/AccountPicture.png')}
            style={accountPicture}
          />
        </View>
        <View style={[bottomContainer]}>
          <Text style={[helFont, accountText]}>Account Information</Text>
          <Label
            upperLabel="First Name"
            bottomLabel="John"
          />
          <Label
            upperLabel="Last Name"
            bottomLabel="Doe"
          />
        </View>
        <View style={[centerEverything, actionButtonContainer]}>
          <Ionicons
            name="ios-calculator"
            size={40}
            style={actionButton}
            onPress={() => Actions.calculator()}
          />
          <Ionicons
            name="md-lock"
            size={40}
            style={actionButton}
            onPress={() => Actions.managePasscode()}
          />
          <Ionicons
            name="md-log-out"
            size={40}
            style={actionButton}
            onPress={() => this.onLogout()}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  testShit: {
    borderWidth: 2,
    borderColor: 'red'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F5F5'
  },
  upperContainer: {
    flex: .2,
    marginTop: 24,
    width: deviceWidth,
    paddingTop: 20,
    paddingLeft: 20
  },
  bottomContainer: {
    flex: .6
  },
  helFont: {
    fontFamily: 'Helvetica Neue',
  },
  accountPicture: {
    width: deviceWidth*0.28,
    height: deviceWidth*0.28,
  },
  accountText: {
    fontSize: 18,
    color: '#525760',
    padding: 20
  },
  actionButtonContainer: {
    flex: .2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: deviceWidth,
    // height: 100%
  },
  actionButton: {
    color: '#232323',
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(Account);
