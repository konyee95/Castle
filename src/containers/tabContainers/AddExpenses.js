// console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  LayoutAnimation,
  ListView,
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CategoryBox from './../../components/CategoryBox';
import { ExpensesInput, ActionButton } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const mic = <Ionicons name="ios-mic" size={24} color="#202020" />
const income = <Ionicons name="ios-home" size={24} color="#202020"/>

import expensesType from './../../data/ExpensesType';

class AddExpenses extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this); //bind the renderRow() to this
    this.state = {
      calendarOpenedAndroid: false,
      entered: false,
      modalVisible: false,
      datePickerModalVisible: false,
      spentAmount: '',
      date: new Date(),
      formattedDate: '',
      formattedTime: '',
      selectedCategory: '',
      note: '',
    };
  }

  componentWillMount() {
    this.createDataSource(expensesType)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  createDataSource(expensesType) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(expensesType);
  }

  renderRow(data) {
    return(
      <CategoryBox 
        data={data} 
        onPress={() => this.setState({ 
          selectedCategory: data.categoryID,
          modalVisible: false 
         })
        }
      />
    )
  }

  renderSaveButton() {
    if (this.state.entered && this.state.spentAmount != '') {
      return (
        <TouchableOpacity
          style={[styles.centerEverything, styles.saveButtonStyle]}
          onPress={() => 
            this.setState({ 
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

  launchAndroidPicker() {
    
  }

  renderView() {
    let minimumDate = new Date(2016, 12, 31);

    const { testShit, centerEverything, container, upperContainer, contentContainer, buttonContainer, helFont,
      bitOfShadow, propTextInputStyle, saveButtonStyle, saveButtonText, selectCategoryContainer, noteStyle, disable,
      modalContainer, upperModal, modalTitle, bottomModal, datePickerModalContainer,  datePickerContainer, datePickerMessageContainer, datePickerMessage, 
      datePickerMessageFeature, pickerTextControl, datePickerIOS, datePickerConfirmButton, listViewContainer} = styles;
    
    return(
      <View style={[container]}>
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
          <TouchableOpacity 
            style={[upperModal, centerEverything]}
            onPress={() => this.setState({ modalVisible: true })}>
            <Text style={modalTitle}>SELECT A CATEGORY</Text>
          </TouchableOpacity>
          <View>
            <TextInput 
              style={[noteStyle]}
              value={this.state.note}
              onChangeText={(note) => this.setState({ note })}
              placeholder="Note"
              textAlign="center"
              multiline
              autoCorrect={false} />
          </View>
        </View>

        <View style={[buttonContainer]}>
          <ActionButton 
            onPress={() => this.setState({ datePickerModalVisible: true })}
            actionButtonChild={<Text style={{ fontSize: 24, fontWeight: '500' }}>{Moment(this.state.date).format('DD')}</Text>}
            actionButtonText="Calender" 
            />
          <ActionButton 
            onPress={() => console.log('Voice action button pressed')}
            actionButtonChild={mic}
            actionButtonText="Voice"
            />
          <ActionButton 
            onPress={() => Actions.setCredentials()}
            actionButtonChild={income}
            actionButtonText="Add Income"
            />
        </View>

        <Modal
          animationType={"fade"}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: true }) }
          visible={this.state.modalVisible}>
          <View style={[modalContainer]}>
            <TouchableOpacity 
                style={[upperModal, centerEverything, bitOfShadow]}
                onPress={() => this.setState({ modalVisible: false }) }>
                <Text style={[modalTitle]}>SELECT A CATEGORY</Text>
              </TouchableOpacity>
            <ListView
              style={listViewContainer}
              dataSource={this.dataSource}
              renderRow={this.renderRow} />
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
                <Text style={datePickerMessage}>Select a Date</Text>
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
  selectCategoryContainer: {
    width: deviceWidth*0.7,
    height: 50,
  },
  noteStyle: {
    fontSize: Math.round(deviceWidth*0.043),
    width: deviceWidth*0.7,
    height: deviceHeight*0.25,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 2
  },
  disable: {
    color: 'grey'
  },
  datePickerModalContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: 350,
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
  datePickerConfirmButton: {
    width: deviceWidth*0.7,
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 20
  },
  modalContainer: {
    width: deviceWidth*0.7,
    height: deviceHeight*0.4,
    marginTop: deviceHeight*0.25,
    marginLeft: deviceWidth*0.15,
    // backgroundColor: '#FFF',
    borderRadius: 3
  },
  upperModal: {
    width: deviceWidth*0.7,
    height: 50,
    padding: 10,
    backgroundColor: '#202020',
    borderRadius: 2
  },
  modalTitle: {
    color: '#FFF',
    fontSize: Math.round(deviceWidth*0.035),
    fontFamily: 'HelveticaNeue-Medium',
    letterSpacing: 3,
    textAlign: 'center'
  },
  listViewContainer: {
    width: deviceWidth*0.7,
    height: 300
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(AddExpenses);
