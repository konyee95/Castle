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
import ActionSheet, { ActionSheetItem } from 'react-native-action-sheet-component';

import CategoryBox from './../../components/CategoryBox';
import { ExpensesInput, ActionButton } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const mic = <Ionicons name="ios-mic" size={24} color="#202020" />

import expensesType from './../../data/ExpensesType';

class AddExpenses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entered: false,
      datePickerModalVisible: false,
      spentAmount: '',
      date: new Date(),
      selectedCategory: '',
      selectedCategoryBackground: '#202020',
      selectedCategoryText: 'SELECT A CATEGORY',
      note: '',
      selectedItems: 'item1',
      swapVisible: true
    };
  }

  componentWillMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderSaveButton() {
    if (this.state.entered && this.state.spentAmount != '') {
      return (
        <TouchableOpacity 
          style={[styles.buttonContainer, styles.centerEverything]}
          onPress={() => this.submitExpenses()}>
          <Text style={styles.modalTitle}>SUBMIT</Text>
        </TouchableOpacity>
      )
    }
  }

  randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  submitExpenses() {
    const { spentAmount, selectedCategory, date, note } = this.state;

    var expensesObject = {
      expenseID: this.randomString(28),
      amount: spentAmount,
      category: selectedCategory,
      exactDate: date,
      date: Moment(date).format('YYYY-MM-DD'),
      time: Moment(date).format('HH:mm:ss'),
      note: note,
    }
    
    this.props.submitExpenses(expensesObject);

    this.setState({ 
      entered: !this.state.entered,
      spentAmount: '', 
      date: new Date(),
      note: '',
      selectedCategory: '',
      selectedCategoryBackground: '#202020',
      selectedCategoryText: 'SELECT A CATEGORY',
    });
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
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };

  launchCalendar() {
    if(Platform.OS === 'android') {
      this.showPicker()
    } else {
      this.setState({ datePickerModalVisible: true })
    }
  }

  onChange = (value, index, values) => {
    this.setState({ selectedItems: values });
  }

  onItemPress = (value) => {
    console.log('Press: value -> ', value);
  }

  showBottomActionSheet = () => {
    this.bottomActionSheet.show();
  }

  marginStyle(id) {
    if(id === 7) {
      return {
        marginBottom: 50
      }
    }
  }

  renderCategorySheet() {
    let views = [];
    expensesType.forEach((item, id) => {
      views.push(
        <ActionSheetItem 
          key={id}
          text={item.category}
          value={item.categoryID}
          icon={ <Ionicons name={item.iconName} color={item.color} size={item.iconSize} style={{ marginRight: 30 }} /> }
          style={[styles.actionIcon, this.marginStyle(id)]}
          onPress={() => this.setState({
            selectedCategory: item.categoryID,
            selectedCategoryBackground: `${item.color}`,
            selectedCategoryText: item.category
          })}
        />
      )
    });

    return views;
  }

  renderSwap() {
    if(this.state.swapVisible) {
      return (
        <TouchableOpacity 
          style={[ { position: 'absolute', right: 25, top: 30} ]}
          onPress={() => Actions.incomeModal()}>
          <Ionicons name="md-swap" size={30} />
        </TouchableOpacity>
      )
    }
  }

  renderVoice() {
    if(!this.state.entered || this.state.spentAmount === '') {
      return (
        <ActionButton 
          propStyle={{ position: 'absolute', bottom: 10, right: 20 }}
          onPress={() => Actions.voiceModal()}
          actionButtonChild={mic} />
      )
    }
  }

  renderView() {

    let minimumDate = new Date(2016, 12, 31);

    const { centerEverything, container, upperContainer, helFont,
      bitOfShadow, propTextInputStyle, noteStyle, upperModal, modalTitle, bottomModal, datePickerModalContainer,  datePickerContainer, datePickerMessageContainer, datePickerMessage, 
      datePickerMessageFeature, datePickerIOS, datePickerConfirmButton, buttonContainer,} = styles;
    
    return(
      <View style={[container, centerEverything]}>
        
        {this.renderSwap()}
        {this.renderVoice()}

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
            value={this.state.spentAmount} />
        </View>

        <TouchableOpacity 
          style={[upperModal, centerEverything, { backgroundColor: this.state.selectedCategoryBackground }]}
          onPress={this.showBottomActionSheet}>
          <Text style={modalTitle}>{this.state.selectedCategoryText}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[upperModal, centerEverything, { backgroundColor: '#FFF' } ]}
          onPress={() => this.launchCalendar()}>
          <Text style={[modalTitle, { color: '#000' }]}>{Moment(this.state.date).format('MMMM Do YYYY')}</Text>
        </TouchableOpacity>
        
        <View>
          <TextInput 
            style={[noteStyle]}
            value={this.state.note}
            onChangeText={(note) => this.setState({ note })}
            placeholder="What did you spend on?"
            textAlign="center"
            multiline
            autoCorrect={false} />
        </View>

        {this.renderSaveButton()}
          
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
                onDateChange={(date) => this.setState({ date })
                }/>
                <TouchableOpacity 
                  style={[datePickerConfirmButton]}
                  onPress={() => this.setState({ datePickerModalVisible: false })}>
                  <Text style={modalTitle}>CONFIRM TIME</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ActionSheet
          ref={(actionSheet) => { this.bottomActionSheet = actionSheet; }}
          position="bottom">
          {this.renderCategorySheet()}
        </ActionSheet>

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
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: 20
  },
  upperContainer: {
    flexDirection: 'row',
    paddingBottom: 40
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
  noteStyle: {
    fontSize: Math.round(deviceWidth*0.043),
    width: deviceWidth*0.7,
    height: deviceHeight*0.2,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 2
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
  datePickerConfirmButton: {
    width: deviceWidth*0.7,
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 20
  },
  upperModal: {
    width: deviceWidth*0.7,
    height: 50,
    padding: 10,
    backgroundColor: '#202020',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: Math.round(deviceWidth*0.04),
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
    textAlign: 'center'
  },
  buttonContainer: {
    width: deviceWidth*0.7,
    height: 50,
    backgroundColor: '#202020'
  },
  actionIcon: {
    paddingTop: 12,
    paddingBottom: 12,
  },
}

const mapStateToProps = (state) => {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(AddExpenses);
