import React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions
} from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const PasscodeComponent = ({ inputRef, autoFocus, onChangeText, value}) => {

  const { inputStyle, underlineStyle } = styles;
  return(
    <View>
      <TextInput
        ref={(r) => { inputRef && inputRef(r) }}
        autoFocus={autoFocus}
        style={[inputStyle]}
        maxLength={1}
        keyboardType="numeric"
        placeholderTextColor="#212121"
        secureTextEntry={true}
        onChangeText={onChangeText}
        value={value}
      />
      <View style={underlineStyle} />
    </View>
  );
}

const styles = {
  inputStyle: {
    height: 80,
    width: 0.18*deviceWidth,
    fontSize: 0.10*deviceWidth,
    color: '#FFF',
    paddingLeft: 19,
    marginLeft: 10,
    marginBottom: 0,
  },
  underlineStyle: {
    width: 0.18*deviceWidth,
    height: 4,
    backgroundColor: '#FFF',
    marginLeft: 10,
    borderRadius: 10
  }
}

export { PasscodeComponent };
