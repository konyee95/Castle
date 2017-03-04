import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import expensesType from './../../data/ExpensesType';
import { ExpenseItem } from './../../components/common';

class ExpensesList extends Component {

  render() {
    const { testShit, centerEverything, container } = styles;
    console.log(this.props.expenses)
    return(
      <View style={[container, centerEverything]}>
        <ExpenseItem 
          iconName="ios-pizza" 
          iconColor="#1DAFEB"
          note="Pizza with friends"
          category="Food"
          amount="30" />
        <ExpenseItem 
          iconName="ios-pizza" 
          iconColor="#1DAFEB"
          note="Pizza with friends"
          category="Food"
          amount="30" />
          <ExpenseItem 
          iconName="ios-pizza" 
          iconColor="#1DAFEB"
          note="Pizza with friends"
          category="Food"
          amount="30" />
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
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 24,
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  }
}

export default connect(mapStateToProps, actions)(ExpensesList);