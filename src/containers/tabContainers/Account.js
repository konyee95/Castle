import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import { Button } from './../../components/common';

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
    const { centerEverything, container } = styles;
    return(
      <View style={[centerEverything, container]}>
        <Button
          buttonText="SIGN OUT"
          onPress={() => this.onLogout()}
        />
        <Button
          buttonText="MANAGE PASSCODE"
          onPress={() => Actions.managePasscode()}
        />
      </View>
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
    backgroundColor: '#F5F5F5'
  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(Account);
