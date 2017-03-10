import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  NativeAppEventEmitter,
  Platform,
  NetInfo
} from 'react-native';

var SpeechToText = require('react-native-speech-to-text-ios');

var Spinner = require('react-native-spinkit');
import { ActionButton } from './../../components/common';

import { Actions } from 'react-native-router-flux';

import Ionicons from 'react-native-vector-icons/Ionicons';
const mic = <Ionicons name="ios-mic" size={24} color="#202020" />
const close = <Ionicons name="md-close" size={40} color="#202020" />

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Voice extends Component {

  constructor(props) {
    super(props)
    this.state = {
      spinnerVisible: false,
      result: '"Today I spend ten dollar on transport"',
      isConnected: null
    }

    this.subscription = NativeAppEventEmitter.addListener(
      'SpeechToText',
      (result) => {
        if (result.error) {
          // alert(JSON.stringify(result.error));
          console.log(result.error)
          this.setState({ result: 'Intelligent Voice not available. \nPlease try again later', spinnerVisible: false })
        } else {
          console.log(result.bestTranscription.formattedString);
          this.setState({ result: result.bestTranscription.formattedString })
        }
      }
    );
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
        'change',
        this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
        (isConnected) => { this.setState({ isConnected }); }
    );
  }

  componentWillMount() {
    if(Platform.OS === 'android') {
      this.setState({ result: 'Coming to Android soon!'})
    }
  }

  componentWillUnmount() {
    if (this.subscription != null) {
      this.subscription.remove();
      this.subscription = null;
    }

    NetInfo.isConnected.removeEventListener(
        'change',
        this._handleConnectivityChange
    );
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  };

   _startSpeaking() {
    SpeechToText.startRecognition("en-US");
  }

  _stopRecording() {
    SpeechToText.finishRecognition()
  }

  renderControl() {
    if(!this.state.spinnerVisible) {
      if(Platform.OS === 'android') {
        return (
          <ActionButton
            onPress={() => Actions.pop()}
            actionButtonChild={close}
          />
        )
      } else {
        return(
          <ActionButton
            onPress={() => {
              this._startSpeaking()
              this.setState({ spinnerVisible: true, result: 'Listening...' })
              }}
            actionButtonChild={mic}
          />
        )
      }
    } else {
      return(
        <TouchableOpacity 
          style={styles.spinnerBox}
          onPress={() => {
            this._stopRecording()
            this.setState({ spinnerVisible: false })
            }}>
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
        </View>
        <View style={[incomeContentContainer]}>
          <Text style={[incomeTitleDesc]}>
          {
            this.state.isConnected ? 
            this.state.result :
            'Intelligent Voice not available. \nPlease connect to the Internet'
          }
          </Text>
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
    fontSize: Math.floor(deviceWidth*0.055),
    fontFamily: 'HelveticaNeue-Light',
    textAlign: 'center',
    paddingTop: 10
  },
  incomeContentContainer: {
    flex: 6,
    alignItems: 'center',
    padding: 20
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