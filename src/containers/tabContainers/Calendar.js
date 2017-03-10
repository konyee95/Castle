import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class Calendar extends Component {

  render() {
    const { testShit, centerEverything, container, empty } = styles;
    return(
      <View style={[centerEverything, container]}>
        <Text style={empty}>Coming soon</Text>
      </View>
    )
  }
}

const styles = {
  testShit: {
    borderColor: 'red',
    borderWidth: 2
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 24,
  },
  empty: {
    fontSize: 22,
    fontWeight: '300',
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  }
}

export default connect(mapStateToProps, actions)(Calendar);