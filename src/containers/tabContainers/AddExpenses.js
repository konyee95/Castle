// console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  LayoutAnimation,
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Moment from 'moment';

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
      calendarOpenedAndroid: false,
      entered: false,
      modalVisible: false,
      datePickerModalVisible: false,
      spentAmount: '',
      date: new Date(),
      formattedDate: '',
      formattedTime: '',
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
          onPress={() => this.setState({ 
            entered: !this.state.entered, 
            spentAmount: '', 
            date: new Date(),
            note: ''
            })
          }>
          <Ionicons
            name="md-send"
            size={22}
          />
        </TouchableOpacity>
      )
    }
  }

  showPicker = async (stateKey, options) => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        this.setState({ 
          date: selectedDate, 
          formattedDate: Moment(selectedDate).format('YYYY-MM-DD'),
          formattedTime: Moment(new Date()).format('h:mm A'),
          calendarOpenedAndroid: !this.state.calendarOpenedAndroid
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };

  launchCalender() {
    if(Platform.OS === 'ios') {
      this.setState({ datePickerModalVisible: true })
    } else if(Platform.OS === 'android') {
      this.setState({ calendarOpenedAndroid: true })
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderView() {
    let minimumDate = new Date(2016, 12, 31);

    const { testShit, centerEverything, container, upperContainer, contentContainer, buttonContainer, helFont,
      bitOfShadow, propTextInputStyle, saveButtonStyle, saveButtonText, datePickerStyle, buttonText, noteStyle, disable,
      modalContainer, upperModal, modalTitle, bottomModal, datePickerModalContainer,  datePickerContainer, datePickerMessageContainer, datePickerMessage, 
      datePickerMessageFeature, pickerTextControl, pickerTextStyle, datePickerIOS, datePickerConfirmButton} = styles;
    
    return(
      <View style={[container]}>
        {/*{this.state.calendarOpenedAndroid ? this.showPicker() : console.log('sdasda')}*/}
        <View style={[centerEverything, contentContainer]}>
            <View style={[centerEverything, upperContainer]}>
              <ExpensesInput
                propViewStyle={[bitOfShadow]}
                propTextInputStyle={propTextInputStyle}
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
          <CategoryBox iconName="md-pizza" categoryName="FOOD" onPress={() => this.setState({ modalVisible: true })}/>
          <View>
            <TextInput 
              style={[noteStyle, bitOfShadow]}
              value={this.state.note}
              onChangeText={(note) => this.setState({ note })}
              placeholder="Note"
              textAlign="center"
              multiline
              autoCorrect={false} />
          </View>
        </View>

        <View style={[buttonContainer]}>
          <View style={centerEverything}>
            <TouchableOpacity 
              style={[datePickerStyle, centerEverything, bitOfShadow]}
              onPress={() => this.launchCalender() }>
              <Text style={{ fontSize: 24, fontWeight: '500' }}>{Moment(this.state.date).format('DD')}</Text>
            </TouchableOpacity>
            <Text style={buttonText}>Calendar</Text>
          </View>
          <View style={centerEverything}>
            <TouchableOpacity
              style={[datePickerStyle, centerEverything, bitOfShadow]}
              onPress={() => console.log('sdsadasd')}>
              {mic}
            </TouchableOpacity>
            <Text style={[buttonText, disable]}>Voice</Text>
          </View>
          <View style={centerEverything}>
            <TouchableOpacity
              style={[datePickerStyle, centerEverything, bitOfShadow]}
              onPress={() => console.log('sdsadasd')}>
              {github}
            </TouchableOpacity>
            <Text style={buttonText}>GitHub</Text>
          </View>
        </View>

        <Modal
          animationType={"fade"}
          transparent={true}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible) }
          visible={this.state.modalVisible}>
          <View style={[modalContainer]}>
            <TouchableOpacity 
                style={[upperModal, centerEverything, bitOfShadow]}
                onPress={() => this.setModalVisible(!this.state.modalVisible) }>
                <Text style={[modalTitle]}>SELECT A CATEGORY</Text>
              </TouchableOpacity>
            <View style={bottomModal}>

            </View>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          onRequestClose={() => this.setState({ datePickerModalVisible: false }) }
          visible={this.state.datePickerModalVisible}>
          <View style={[datePickerModalContainer]}>
            <View style={[datePickerContainer]}>
              <View style={[datePickerMessageContainer]}>
                <Text style={datePickerMessage}>Select a Time</Text>
                <Text style={[datePickerMessage, datePickerMessageFeature]}>When did you spend?</Text>
              </View>
              <DatePickerIOS 
                date={this.state.date}
                style={[datePickerIOS]}
                mode="datetime"
                minimumDate={minimumDate}
                onDateChange={(date) => this.setState({ 
                  date, 
                  formattedDate: Moment(date).format('YYYY-MM-DD'),
                  formattedTime: Moment(date).format('h:mm A') 
                  })
                }/>
                <TouchableOpacity 
                  style={[datePickerConfirmButton]}
                  onPress={() => this.setState({ datePickerModalVisible: false })}>
                  <Text style={modalTitle}>CONFIRM TIME</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  render() {
    return(
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        {this.renderView()}
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
    flexDirection: 'row',
    paddingBottom: 40
  },
  contentContainer: {
    flex: 7
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
    backgroundColor: '#fff'
  },
  buttonText: {
    fontSize: 12,
    paddingTop: 6,
    backgroundColor: 'transparent'
  },
  noteStyle: {
    fontSize: Math.round(deviceWidth*0.043),
    width: deviceWidth*0.7,
    height: deviceHeight*0.25,
    backgroundColor: '#FFF',
    padding: 10
  },
  disable: {
    color: 'grey'
  },
  datePickerContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: 350,
    backgroundColor: '#FFF'
  },
  datePickerMessageContainer: {
    width: deviceWidth,
    height: 60,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  datePickerMessage: {
    fontSize: 17,
  },
  datePickerMessageFeature: {
    fontWeight: '500'
  },
  datePickerIOS: {
    width: deviceWidth,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EDEDED',
  },
  pickerTextControl: {
    padding: 5,
  },
  pickerTextStyle: {
    fontWeight: '400'
  },
  datePickerConfirmButton: {
    width: deviceWidth*0.7,
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 20
  },
  confirmText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 2,
    textAlign: 'center'
  },
  modalContainer: {
    width: deviceWidth*0.7,
    height: deviceHeight*0.4,
    marginTop: deviceHeight*0.25,
    marginLeft: deviceWidth*0.15,
    backgroundColor: '#FFF',
    borderRadius: 3
  },
  upperModal: {
    height: 50,
    padding: 10,
    backgroundColor: '#202020'
  },
  modalTitle: {
    color: '#FFF',
    fontSize: Math.round(deviceWidth*0.035),
    fontFamily: 'HelveticaNeue-Medium',
    letterSpacing: 3,
    textAlign: 'center'
  },
  bottomModal: {
    
  },
  datePickerModalContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: 350,
    backgroundColor: '#FFF',
  }
}

export default AddExpenses;
