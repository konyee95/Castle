import React from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const pizza = <Ionicons name="ios-pizza" size={22} />

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const CategoryBox = ({ onPress, iconName, categoryName }) => {
  const { bitOfShadow, boxContainer, categoryText } = styles;
  return(
    <TouchableOpacity style={[boxContainer, bitOfShadow]} onPress={onPress}>
      <Ionicons name={iconName} size={20} color="#FFF" />
      <Text style={categoryText}>{categoryName}</Text>
    </TouchableOpacity>
  )
}

const styles = {
    bitOfShadow: {
      shadowColor: '#1DAFEB',
      shadowRadius: 20,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 1
    },
    boxContainer: {
      flexDirection: 'row',
      width: deviceWidth*0.7,
      height: 50,
      backgroundColor: '#1DAFEB',
      alignItems: 'center',
      justifyContent: 'center'
    },
    categoryText: {
      color: '#FFF',
      fontSize: Math.round(deviceWidth*0.043),
      fontFamily: 'HelveticaNeue-Medium',
      paddingLeft: 20,
      letterSpacing: 5
    }
}

export { CategoryBox };
