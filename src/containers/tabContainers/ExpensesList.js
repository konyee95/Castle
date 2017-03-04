import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class ExpensesList extends Component {

  render() {
    console.log(this.props.expenses)
    return(
      <View>
      
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  }
}

export default connect(mapStateToProps, actions)(ExpensesList);