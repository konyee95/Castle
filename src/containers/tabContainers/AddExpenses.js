import React, { Component } from 'react';
import {
  LayoutAnimation,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';

import { ExpensesInput } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const calendar = <Ionicons name="ios-calendar" size={24} color="#FFF" />
const done = <Ionicons name="md-checkmark" size={24} color="#FFF"/>

class AddExpenses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entered: false,
      spentAmount: '',
      date: '',
      dateSelected: false
    }
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderSaveButton() {
    if (this.state.entered && this.state.spentAmount != '') {
      return (
        <TouchableOpacity
          style={[styles.centerEverything, styles.saveButtonStyle]}
          onPress={() => console.log(this.state.date)}>
          <Ionicons
            name="md-send"
            size={22}
          />
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { testShit, centerEverything, container, upperContainer, contentContainer, helFont,
      bitOfShadow, propTextInputStyle, saveButtonStyle, saveButtonText, datePickerStyle} = styles;
    return(
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={container}>

          <View style={[centerEverything, upperContainer]}>
            <ExpensesInput
              propViewStyle={[bitOfShadow]}
              propTextInputStyle={propTextInputStyle}
              keyboardType="numeric"
              placeholder="How much did you spend?"
              placeholderTextColor="#525760"
              textAlign="center"
              iconName="ios-flash"
              iconOnPress={() => this.setState({ dateSelected: true })}
              onChangeText={(spentAmount) => this.setState({ entered: true, spentAmount })}
              value={this.state.spentAmount}
            />
            {this.renderSaveButton()}
          </View>
          <View style={[centerEverything, contentContainer]}>
            <DatePicker
              style={[centerEverything, datePickerStyle]}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                }
              }}
              confirmBtnText="Done"
              cancelBtnText="Cancel"
              minDate="2017-01-01"
              maxDate="2017-12-31"
              showIcon={false}
              dateIcon={((this.state.dateSelected && this.state.spentAmount != '') ? done : calendar)}
              date={this.state.date}
              onDateChange={(date) => {this.setState({ date }) }}
              onCloseModal={() => this.setState({ dateSelected: true })}
            />
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
  bitOfShadow: {
    shadowColor: '#D3D3D3',
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1
  },
  propTextInputStyle: {
    fontSize: Math.round(deviceWidth*0.043),
    color: '#000',
    backgroundColor: '#fff'
  },
  saveButtonStyle: {
    backgroundColor: 'transparent',
    paddingLeft: 20
  },
  saveButtonText: {
    fontSize: Math.round(deviceWidth*0.043),
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  dateIcon: {
    borderWidth: 0
  },
  datePickerStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#1E1E1E'
  }
}

export default AddExpenses;
