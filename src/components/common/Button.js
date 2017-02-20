import React from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const Button = ({ buttonPadding, buttonText, onPress }) => {
  const { buttonStyle, buttonTextStyle} = styles;
  return(
    <View style={buttonPadding}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={onPress}>
        <Text style={buttonTextStyle}>{buttonText}</Text>
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
    fontWeight: 'bold'
  }
}

export { Button };
