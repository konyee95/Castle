import React from 'react';
import { View, Text } from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const MonthLabel = ({ label }) => {

  const { testShit, container, labelStyle } = styles;

  return(
    <View style={[container]}>
      <Text style={labelStyle}>{label}</Text>
    </View>
  )
}

const styles = {
  testShit: {
    borderColor: 'red',
    borderWidth: 1,
  },
  container: {
    // padding: 5
    width: deviceWidth*0.33,
    alignItems: 'center'
  },
  labelStyle: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1
  }
}

export { MonthLabel };
