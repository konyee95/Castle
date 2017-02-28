import React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const ExpensesInput = ({ propViewStyle, propTextInputStyle, placeholder, placeholderTextColor, secureTextEntry,
  onChangeText, value, propHeight, propWidth, multiline, keyboardType, textAlign, iconName, iconOnPress}) => {

  const { testShit, container, inputStyle, actionButton } = styles;

  return(
    <View style={[container, propViewStyle]}>
      <Ionicons
        name={iconName}
        size={22}
        style={actionButton}
        onPress={iconOnPress}
      />
      <TextInput
        style={[inputStyle, propTextInputStyle, propHeight, propWidth]}
        autoCapitalize={'none'}
        autoCorrect={false}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        textAlign={textAlign}
        underlineColorAndroid='rgba(0,0,0,0)'
      />
    </View>
  );
}

const styles = {
  testShit: {
    borderWidth: 2,
    borderColor: 'red'
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  inputStyle: {
    height: 50,
    width: deviceWidth*0.6,
    borderColor: 'white',
    borderWidth: 1,
    fontSize: 14,
  },
  actionButton: {
    paddingLeft: 15,
    // paddingRight: 5
  }
}

export { ExpensesInput };
