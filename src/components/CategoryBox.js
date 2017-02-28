import React, { Component } from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const pizza = <Ionicons name="ios-pizza" size={22} />

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class CategoryBox extends Component {
  render() {
    const { category, categoryID, color, iconName } = this.props.data;
    const { onPress } = this.props;
    const { boxContainer, categoryText } = styles;
    return(
      <TouchableOpacity 
        style={[boxContainer, { backgroundColor: `${color}` }]} 
        onPress={onPress}>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <Ionicons name={`${iconName}`} size={20} color="#FFF" />
        </View>
        <Text style={categoryText}>{category}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = {
    boxContainer: {
      flexDirection: 'row',
      width: deviceWidth*0.7,
      height: 50,
      alignItems: 'center',
    },
    categoryText: {
      color: '#FFF',
      alignSelf: 'center',
      fontSize: Math.round(deviceWidth*0.04),
      fontFamily: 'HelveticaNeue-Medium',
      letterSpacing: 5,
    }
}

export default CategoryBox;
