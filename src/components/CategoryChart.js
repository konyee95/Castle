import React, { Component } from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

export default class CategoryChart extends Component {
  render() {
    const { testShit, container } = styles;
    const { percentage } = this.props;
    return( 
      <View style={[container, testShit]}>
        <Text>{percentage}%</Text>
      </View>
    )
  }
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
