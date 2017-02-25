import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { ExpensesInput } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class AddExpenses extends Component {
  render() {
    const { testShit, centerEverything, container, upperContainer, contentContainer, helFont, propViewStyle, propTextInputStyle} = styles;
    return(
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={container}>
          <View style={[centerEverything, upperContainer]}>
            <ExpensesInput
              propViewStyle={propViewStyle}
              propTextInputStyle={propTextInputStyle}
              keyboardType="numeric"
              placeholder="How much did you spend?"
              placeholderTextColor="#525760"
              textAlign="center"
              iconName="ios-flash"
            />
          </View>
          <View style={[contentContainer]}>

          </View>
        </View>
      </TouchableWithoutFeedback>
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
    backgroundColor: '#F5F5F5',
    paddingTop: 24,
  },
  upperContainer: {
    flex: 4,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 6
  },
  helFont: {
    fontFamily: 'Helvetica Neue',
  },
  propViewStyle: {
    shadowColor: '#D3D3D3',
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1
  },
  propTextInputStyle: {
    fontSize: Math.round(deviceWidth*0.04),
    color: '#D3D3D3',
    backgroundColor: '#fff'
  }
}

export default AddExpenses;
