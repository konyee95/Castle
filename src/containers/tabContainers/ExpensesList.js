import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import expensesType from './../../data/ExpensesType';
import ExpenseItem from './../../components/ExpenseItem';

class ExpensesList extends Component {

  componentWillMount() {
    this.createDataSource(this.props.expenses)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  createDataSource({ expensesObject }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(expensesObject);
  }

  renderRow(expenseItem) {
    return <ExpenseItem expenseItem={expenseItem} />;
  }

  render() {
    const { testShit, centerEverything, container } = styles;
    return(
      <View style={[container, centerEverything]}>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
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