import React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions
} from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const Input = ({ inputPadding, placeholder, placeholderTextColor, secureTextEntry, onChangeText, value, propHeight, propWidth, multiline}) => {

  const { inputStyle } = styles;

  return(
    <View style={inputPadding}>
      <TextInput
        style={[inputStyle, propHeight, propWidth]}
        autoCapitalize={'none'}
        autoCorrect={false}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = {
  inputStyle: {
    height: 40,
    width: deviceWidth*0.75,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    // borderRadius: 3,
    fontSize: 14,
    paddingLeft: 20,
  }
}

export { Input };
