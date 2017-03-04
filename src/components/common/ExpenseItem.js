import React from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const ExpenseItem = ({ onPress, iconName, iconColor, note, category, amount }) => {
  const { testShit, container, centerEverything, iconContainer, contentContainer, headerContainer, amountContainer, noteText, categoryText } = styles;
  return(
    <View style={container}>
      <View style={[iconContainer, centerEverything]}>
        <Ionicons name={`${iconName}`} size={30} color={iconColor} />
      </View>
      <View style={[contentContainer]}>
        <View style={[headerContainer]}>
          <Text style={noteText}>{note}</Text>
          <View style={[amountContainer, centerEverything]}>
            <Text style={categoryText}>$ </Text>
            <Text style={[noteText, { fontWeight: '500' }]}>{amount}</Text>
          </View>
        </View>
        <Text style={categoryText}>{category}</Text>
      </View>
    </View>
  )
}

const styles = {
  testShit: {
    borderColor: 'red',
    borderWidth: 1,
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#FFF',
    width: deviceWidth*0.95,
    height: deviceHeight*0.1,
    margin: 0.5,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    flex: 1.8
  },
  contentContainer: {
    flex: 8.2,
    marginRight: 20
  },
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  amountContainer: {
    flexDirection: 'row'
  },
  noteText: {
    color: '#212121',
    fontSize: 18,
    fontWeight: '400'
  },
  categoryText: {
    color: '#7F7F7F',
    fontSize: 15,
    fontWeight: '300'
  }
}

export { ExpenseItem };
