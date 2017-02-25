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
      />
      <Ionicons
        name={iconName}
        size={22}
        style={actionButton}
        onPress={iconOnPress}
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
    paddingRight: 20
  }
}

export { ExpensesInput };
