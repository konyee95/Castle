import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';

var Spinner = require('react-native-spinkit');
import { ActionButton } from './../../components/common';

import Ionicons from 'react-native-vector-icons/Ionicons';
const mic = <Ionicons name="ios-mic" size={24} color="#202020" />

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Voice extends Component {

  constructor(props) {
    super(props)
    this.state = {
      spinnerVisible: false
    }
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderControl() {
    if(!this.state.spinnerVisible) {
      return(
        <ActionButton
          onPress={() => this.setState({ spinnerVisible: true })}
          actionButtonChild={mic}
          />
      )
    } else {
      return(
        <TouchableOpacity 
          style={styles.spinnerBox}
          onPress={() => this.setState({ spinnerVisible: false })}>
          <Spinner 
          isVisible={this.state.spinnerVisible} 
          size={60} 
          type="ChasingDots" 
          color="#202020" />
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { centerEverything, bitOfShadow, incomeModalContainer, incomeTitleContainer, 
      incomeTitle, incomeTitleDesc, incomeContentContainer, spinnerStyle } = styles;
    return(
      <View style={[incomeModalContainer, bitOfShadow]}>
        <View style={[incomeTitleContainer, centerEverything]}>
          <Text style={[incomeTitle]}>INTELLIGENT VOICE</Text>
          <Text style={[incomeTitleDesc]}>Expense tracking like a boss</Text>
        </View>
        <View style={[incomeContentContainer]}>

        </View>
        <View style={[spinnerStyle, centerEverything]}>
         {this.renderControl()}
        </View>
      </View>
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
  incomeTitleDesc: {
    fontSize: Math.floor(deviceWidth*0.04),
    fontFamily: 'HelveticaNeue-Light',
    letterSpacing: 2,
    paddingTop: 10
  },
  incomeContentContainer: {
    flex: 6,
    alignItems: 'center',
  },
  spinnerBox: {
    height: 70,
    width: 70,
  },
  spinnerStyle:{ 
    paddingBottom: 50
  }
}

export default Voice;