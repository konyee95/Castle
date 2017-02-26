// console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  LayoutAnimation,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';

import { ExpensesInput, CategoryBox } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const mic = <Ionicons name="ios-mic" size={24} color="#202020" />
const github = <Ionicons name="logo-github" size={24} color="#202020"/>

const expensesType = [
  [1, 'food'],
  [2, 'clothes']
]

class AddExpenses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entered: false,
      spentAmount: '',
      date: '',
      time: '',
      dateSelected: false,
      note: ''
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
    console.log(this.state.date)
    const { testShit, systemFont, centerEverything, container, upperContainer, buttonContainer, helFont,
      bitOfShadow, propTextInputStyle, saveButtonStyle, datePickerStyle, noteStyle, dateTimeContainer} = styles;
    return(
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[container, centerEverything]}>

          <View style={[centerEverything, upperContainer]}>
            <ExpensesInput
              propViewStyle={[bitOfShadow]}
              propTextInputStyle={[propTextInputStyle, systemFont]}
              keyboardType="numeric"
              placeholder="How much did you spend ?"
              placeholderTextColor="#525760"
              textAlign="center"
              iconName="ios-card"
              onChangeText={(spentAmount) => this.setState({ entered: true, spentAmount })}
              value={this.state.spentAmount}
            />
            {this.renderSaveButton()}
          </View>

          <View style={[centerEverything]}>
            <CategoryBox iconName="md-pizza" categoryName="FOOD" />
            <View style={[dateTimeContainer]}>
              <DatePicker
                style={[datePickerStyle, centerEverything, bitOfShadow]}
                date={this.state.date}
                mode="date"
                placeholder={this.state.date}
                format="YYYY-MM-DD"
                showIcon={false}
                minDate="2017-01-01"
                confirmBtnText="Done"
                cancelBtnText="X"
                customStyles={{
                  dateInput: {
                    borderWidth: 0
                  },
                  dateText: {
                    fontSize: Math.round(deviceWidth*0.043),
                    fontFamily: 'Helvetica',
                    fontWeight: '400',
                    letterSpacing: 2
                  },
                }}
                onDateChange={(date) => {this.setState({ date })}}
              />
              <DatePicker
                style={[datePickerStyle, centerEverything, bitOfShadow]}
                date={this.state.date}
                mode="time"
                placeholder={this.state.time}
                format="hh-mm"
                showIcon={false}
                confirmBtnText="Done"
                cancelBtnText="X"
                customStyles={{
                  dateInput: {
                    borderWidth: 0
                  },
                  dateText: {
                    fontSize: Math.round(deviceWidth*0.043),
                    fontFamily: 'Helvetica',
                    fontWeight: '400',
                    letterSpacing: 2
                  },
                }}
                onDateChange={(time) => {this.setState({ time })}}
              />
            </View>
            <View>
              <TextInput 
                style={[noteStyle, bitOfShadow, systemFont]}
                value={this.state.note}
                onChangeText={(note) => this.setState({ note })}
                placeholder="Note"
                textAlign="center"
                multiline
                autoCorrect={false} />
            </View>
          </View>

          {/*<View style={[buttonContainer]}>
            <View style={centerEverything}>
              <DatePicker
                style={[datePickerStyle, centerEverything, bitOfShadow]}
                date={this.state.date}
                mode="date"
                duration={250}
                placeholder={this.state.date}
                format="DD"
                showIcon={false}
                minDate="2017-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    borderWidth: 0
                  },
                  dateText: {
                    fontSize: 22,
                    fontFamily: 'Helvetica',
                    fontWeight: '400',
                    letterSpacing: 2
                  },
                }}
                onDateChange={(date) => {this.setState({ date })}}
              />
              <Text style={buttonText}>Calendar</Text>
            </View>
            <View style={centerEverything}>
              <TouchableOpacity
                style={[datePickerStyle, centerEverything, bitOfShadow]}
                onPress={() => console.log('sdsadasd')}>
                {mic}
              </TouchableOpacity>
              <Text style={buttonText}>Voice</Text>
              <Text style={buttonText}>Coming Soon</Text>
            </View>
            <View style={centerEverything}>
              <TouchableOpacity
                style={[datePickerStyle, centerEverything, bitOfShadow]}
                onPress={() => console.log('sdsadasd')}>
                {github}
              </TouchableOpacity>
              <Text style={buttonText}>GitHub</Text>
            </View>
          </View>*/}
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
  systemFont: {
    fontSize: Math.round(deviceWidth*0.043),
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
    flexDirection: 'row',
    paddingBottom: 40,
  },
  buttonContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
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
    color: '#000',
    backgroundColor: '#fff'
  },
  saveButtonStyle: {
    backgroundColor: 'transparent',
    paddingLeft: 20
  },
  dateTimeContainer: {
    width: deviceWidth*0.7,
    height: 50,
    flexDirection: 'row'
  },
  datePickerStyle: {
    height: 50,
    width: deviceWidth*0.35,
    backgroundColor: '#fff'
  },
  noteStyle: {
    width: deviceWidth*0.7,
    height: deviceHeight*0.4,
    backgroundColor: '#FFF',
    padding: 10
  },
  
}

export default AddExpenses;
