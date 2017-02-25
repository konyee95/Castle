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
      actionButtonContainer, actionButton, labelSizeA, labelSizeB} = styles;
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
            labelSizeA={labelSizeA}
            labelSizeB={labelSizeB}
          />
          <Label
            upperLabel="Last Name"
            bottomLabel="Doe"
            labelSizeA={labelSizeA}
            labelSizeB={labelSizeB}
          />
        </View>
        <View style={[centerEverything, actionButtonContainer]}>
          <Ionicons
            name="ios-calculator"
            size={35}
            style={actionButton}
            onPress={() => Actions.calculator()}
          />
          <Ionicons
            name="md-lock"
            size={35}
            style={actionButton}
            onPress={() => Actions.managePasscode()}
          />
          <Ionicons
            name="md-log-out"
            size={33}
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
    backgroundColor: '#F5F5F5',
    paddingTop: 24,
  },
  upperContainer: {
    flex: .2,
    width: deviceWidth,
    // paddingTop: 20,
    justifyContent: 'center',
    paddingLeft: 20
  },
  bottomContainer: {
    flex: .65
  },
  helFont: {
    fontFamily: 'Helvetica Neue',
  },
  accountPicture: {
    width: deviceWidth*0.25,
    height: deviceWidth*0.25,
  },
  accountText: {
    fontSize: Math.round(deviceWidth*0.05),
    color: '#525760',
    padding: 20
  },
  actionButtonContainer: {
    flex: .15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: deviceWidth,
    // height: 100%
  },
  actionButton: {
    color: '#232323',
  },
  labelSizeA: {
    fontSize: Math.round(deviceWidth*0.04)
  },
  labelSizeB: {
    fontSize: Math.round(deviceWidth*0.05)
  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(Account);
