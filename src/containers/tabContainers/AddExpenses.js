import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

class AddExpenses extends Component {
  render() {
    const { testShit, centerEverything, container } = styles;
    return(
      <View style={[testShit, centerEverything, container]}>

      </View>
    )
  }
}

const styles = {
  testShit: {
    borderWidth: 2,
    borderColor: 'red'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
}

export default AddExpenses;
