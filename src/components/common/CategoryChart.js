import React from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const CategoryChart = ({ percentage, themeColor }) => {
  const { testShit, container } = styles;
  return(
    <View style={[container, testShit]}>
      
    </View>
  )
}

const styles = {
  testShit: {
    borderWidth: 2,
    borderColor: 'red'
  },
  container: {
    width: deviceWidth*0.18,
    height: deviceHeight*0.38
  }
}

export { CategoryChart };
