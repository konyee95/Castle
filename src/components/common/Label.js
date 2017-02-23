import React from 'react';
import { View, Text  } from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const Label = ({ upperLabel, bottomLabel }) => {
  const { helFont, infoLabel, infoLabelUpperText, infoLabelBottomText } = styles;
  return(
    <View style={infoLabel}>
      <Text style={[helFont, infoLabelUpperText]}>
        {upperLabel}
      </Text>
      <Text style={[helFont, infoLabelBottomText]}>
        {bottomLabel}
      </Text>
    </View>
  )
}

const styles = {
  helFont: {
    fontFamily: 'Helvetica Neue',
  },
  infoLabel: {
    width: deviceWidth,
    height: deviceHeight*0.13,
    backgroundColor: '#FFF',
    borderColor: '#EDEDED',
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  infoLabelUpperText: {
    color: '#A4A4AC',
    fontSize: 18,
    paddingBottom: 10
  },
  infoLabelBottomText: {
    color: '#A4A4AC',
    fontSize: 22,
    fontWeight: '500'
  }
}

export { Label };
