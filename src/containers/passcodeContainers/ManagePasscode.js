import React, { Component } from 'react';
import { Alert, TextInput, View, Text } from 'react-native';
import { Button, PasscodeComponent } from './../../components/common';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ManagePasscode extends Component {

  constructor() {
    super()
    this.state = {
      accessCode1: '',
      accessCode2: '',
      accessCode3: '',
      accessCode4: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.processProps(nextProps);
  }

  processProps(props) {
    console.log(props);
    //to be done
  }

  onUnlock(){
    const { accessCode1, accessCode2, accessCode3, accessCode4 } = this.state;
    passcode = accessCode1 + accessCode2 + accessCode3 + accessCode4;
    Alert.alert(
      'Save passcode',
      'Confirm?',
      [
        {text: "Cancel", onPress: () => Actions.pop() },
        {text: "Save", onPress: () => {
          this.props.setPasscode(passcode);
          Alert.alert('Alert', 'Passcode has been updated!');
          Actions.pop();
        }},
      ]
    )
  }

  render() {
    const { centerEverything, container, controlContainer, innerContainer, titleContainer, titleStyle,
      passcodeContainer, testShit, textInputStyle, propWidth, propTextStyle } = styles;
    return (
      <View style={[container]}>
        <View style={[controlContainer]}>
          <Button
            buttonText="Cancel"
            propWidth={propWidth}
            propTextStyle={propTextStyle}
            onPress={() => Actions.pop()}
           />
        </View>
        <View style={[centerEverything, innerContainer]}>
          <View style={[titleContainer]}>
            <Text style={titleStyle}>Enter Passcode</Text>
          </View>
          <View style={[passcodeContainer]}>
            <PasscodeComponent
              autoFocus={true}
              value={this.state.accessCode1}
              onChangeText={(event) => {
                this.setState({ accessCode1: event }, () => {
                  event && this.passcode2.focus()
                })
              }} />
            <PasscodeComponent
              inputRef={(r) => { this.passcode2 = r }}
              value={this.state.accessCode2}
              onChangeText={(event) => {
                this.setState({ accessCode2: event }, () => {
                  event && this.passcode3.focus()
                })
              }} />
            <PasscodeComponent
              inputRef={(r) => { this.passcode3 = r }}
              value={this.state.accessCode3}
              onChangeText={(event) => {
                this.setState({ accessCode3: event }, () => {
                  event && this.passcode4.focus()
                })
              }} />
            <PasscodeComponent
              inputRef={(r) => { this.passcode4 = r }}
              value={this.state.accessCode4}
              onChangeText={(event) => {
                this.setState({ accessCode4: event }, () => this.onUnlock() )
              }} />
          </View>
        </View>
      </View>
    );
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
    backgroundColor: '#F5F5F5',
    // top: 100
  },
  controlContainer: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 24,
    width: deviceWidth,
    justifyContent: 'space-between'
  },
  innerContainer: {
    top: 0.2*deviceHeight
  },
  titleContainer: {
    marginBottom: 0.05*deviceWidth
  },
  titleStyle: {
    fontSize: 0.08*deviceWidth,
    fontFamily: 'HelveticaNeue-Medium',
    color: '#202020'
  },
  passcodeContainer: {
    top: 0,
    flexDirection: 'row',
  },
  propWidth: {
    width: 0.3*deviceWidth
  },
  propTextStyle: {
    color: '#FFF',
    fontWeight: 'bold',
    letterSpacing: 3
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(ManagePasscode);
