import React from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const InfoBox = ({ dollarSign, featureText, featureDesc }) => {

  const { testShit, boxStyle, upperBox, bottomBox, boxTextStyle, featureTextBold, lessFeature } = styles;

  return(
    <View style={boxStyle}>
      <View style={[upperBox]}>
        <Text style={[boxTextStyle, lessFeature]}>{dollarSign}</Text>
        <Text style={[boxTextStyle, featureTextBold]}>{featureText}</Text>
      </View>
      <View style={[bottomBox]}>
        <Text style={[boxTextStyle, lessFeature]}>{featureDesc} </Text>
      </View>
    </View>
  )
}

const styles = {
  testShit: {
    borderColor: 'red',
    borderWidth: 1,
  },
  boxStyle: {
    backgroundColor: '#FFF',
    height: 80,
    width: deviceWidth*0.45,
    justifyContent: 'center',
    marginLeft: 2
  },
  upperBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingBottom: 5
  },
  bottomBox: {
    paddingLeft: 20
  },
  boxTextStyle: {
    color: 'grey',
    fontSize: 20,
    fontFamily: 'Helvetica Neue',
    letterSpacing: 2
  },
  featureTextBold: {
    color: '#000'
  },
  lessFeature: {
    fontSize: 16,
    letterSpacing: 0
  }
}

export { InfoBox };
