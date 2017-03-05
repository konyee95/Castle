import React from 'react';
import { View, Text } from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const MonthLabel = ({ label }) => {

  const { container, labelStyle } = styles;

  return(
    <View style={[container]}>
      <Text style={labelStyle}>{label}</Text>
    </View>
  )
}

const styles = {
  container: {
    width: deviceWidth*0.33,
    alignItems: 'center'
  },
  labelStyle: {
    color: '#1F1F1F',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1
  }
}

export { MonthLabel };
