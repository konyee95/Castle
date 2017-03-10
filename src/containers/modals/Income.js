import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';

import { ExpensesInput, ActionButton } from './../../components/common';

import Moment from 'moment';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import Ionicons from 'react-native-vector-icons/Ionicons';
const close = <Ionicons name="md-close" size={30} color="#202020" />

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;
const dismissKeyboard = require('dismissKeyboard')

class Income extends Component {

  constructor(props) {
    super(props)
    this.state = {
      incomeAmount: '',
      incomeNote: '',
      date: new Date(),
    }
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  submitIncome() {
    const { incomeAmount, incomeNote, date } = this.state;

    var incomeObject = {
      incomeID: this.randomString(28),
      amount: incomeAmount,
      exactDate: date,
      date: Moment(date).format('YYYY-MM-DD'),
      time: Moment(date).format('HH:mm:ss'),
      note: incomeNote
    }

    this.props.submitIncome(incomeObject)
    this.setState({ incomeAmount: '' })

    Alert.alert('Success', 'Income added!', 
    [
      {text: 'OK', onPress: () => Actions.pop()}
    ])
  }

  render() {
    const { centerEverything, bitOfShadow, propTextInputStyle, incomeModalContainer, incomeTitleContainer, 
      incomeTitle, modalTitle, incomeTitleDesc, incomeContentContainer, incomeButtonContainer } = styles;
    return(
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[incomeModalContainer, bitOfShadow]}>
        <View style={[incomeTitleContainer, centerEverything]}>
          <Text style={incomeTitle}>INCOME</Text>
        </View>
        <View style={[incomeContentContainer]}>
          <ExpensesInput
            propViewStyle={[bitOfShadow, { width: deviceWidth*0.7 }]}
            propTextInputStyle={propTextInputStyle}
            keyboardType="numeric"
            placeholder="How much?"
            placeholderTextColor="#525760"
            textAlign="center"
            iconName="ios-card"
            onChangeText={(incomeAmount) => this.setState({ incomeAmount })}
            value={this.state.incomeAmount} />

          <TouchableOpacity 
            style={[incomeButtonContainer, centerEverything, { marginTop: 50 } ]}
            onPress={() => this.submitIncome()}>
            <Text style={modalTitle}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
        <ActionButton 
          propStyle={{ paddingBottom: 20 }}
          onPress={() => Actions.pop()}
          actionButtonChild={close}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
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
  incomeModalContainer: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight*0.87,
    backgroundColor: '#FFF',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  incomeTitleContainer: {
    flex: 4
  },
  incomeTitle: {
    fontSize: Math.floor(deviceWidth*0.08),
    fontFamily: 'HelveticaNeue-Light',
    letterSpacing: 7,
    textAlign: 'center'
  },
  modalTitle: {
    color: '#FFF',
    fontSize: Math.round(deviceWidth*0.035),
    fontFamily: 'HelveticaNeue-Medium',
    letterSpacing: 3,
    textAlign: 'center'
  },
  incomeTitleDesc: {
    fontSize: Math.floor(deviceWidth*0.055),
    fontFamily: 'HelveticaNeue-Light',
    textAlign: 'center',
    paddingTop: 10
  },
  incomeContentContainer: {
    flex: 6,
    alignItems: 'center',
  },
  incomeButtonContainer: {
    width: deviceWidth*0.7,
    height: 50,
    backgroundColor: '#202020'
  },
}

export default connect(null, actions)(Income);