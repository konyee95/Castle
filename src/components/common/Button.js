import React from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const Button = ({ buttonPadding, buttonText, propWidth, propTextStyle, onPress }) => {
  const { buttonStyle, buttonTextStyle } = styles;
  return(
    <View style={buttonPadding}>
      <TouchableOpacity
        style={[buttonStyle, propWidth]}
        onPress={onPress}>
        <Text style={[buttonTextStyle || propTextStyle]}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  buttonStyle: {
    backgroundColor: '#FFF',
    height: 40,
    width: deviceWidth*0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 5
  },
}

export { Button };
