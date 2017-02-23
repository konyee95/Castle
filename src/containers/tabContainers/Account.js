import React, { Component } from 'react';
import {
  Alert,
  Image,
  View,
  Text,
} from 'react-native';

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
      } = styles;
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
          <Button
            buttonText="SIGN OUT"
            onPress={() => this.onLogout()}
          />
          <Button
            buttonText="MANAGE PASSCODE"
            onPress={() => Actions.managePasscode()}
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
    flex: .8
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
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(Account);
