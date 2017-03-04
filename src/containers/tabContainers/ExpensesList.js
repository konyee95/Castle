import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
} from 'react-native';

import Moment from 'moment';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import expensesType from './../../data/ExpensesType';
import ExpenseItem from './../../components/ExpenseItem';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ExpensesList extends Component {

  componentWillMount() {
    this.createDataSource(this.props.expenses)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.expenses)
  }

  createDataSource({ expensesObject }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.dataSource = ds.cloneWithRowsAndSections(this.transformDataToList(expensesObject));
  }

  transformDataToList(expensesObject) {
    var expensesMap = {} //create a blank map
    expensesObject.forEach((expensesItem) => {
      if(!expensesMap[expensesItem.date]) {
        //create an empty item in the map if nothing exists yet
        expensesMap[expensesItem.date] = [];
      }
      expensesMap[expensesItem.date].push(expensesItem);
    })

    return expensesMap;
  }

  renderRow(expensesItem) {
    return <ExpenseItem expenseItem={expensesItem} />;
  }

  renderSectionHeader(sectionData, date) {
    let today = Moment(new Date()).format("YYYY-MM-DD");
    let yesterday = Moment(today).subtract(1, 'days').format('YYYY-MM-DD');
    console.log(yesterday)
    if (date === today) {
      return <Text style={styles.sectionHeader}>TODAY</Text>
    } else if(date === yesterday) {
      return <Text style={styles.sectionHeader}>YESTERDAY</Text>
    } else {
      return <Text style={styles.sectionHeader}>{date}</Text>
    }
  }

  render() {
    const { centerEverything, container, empty } = styles;

    if(this.props.expenses.expensesObject.length === 0) {
      return(
        <View style={[container, centerEverything]}>
          <Text style={empty}>Add some expenses to begin</Text>
        </View>
      )
    } else {
      return(
        <View style={[container, centerEverything]}>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            renderSectionHeader={this.renderSectionHeader}
          />
        </View>
      )
    }
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
  },
  empty: {
    fontSize: 22,
    fontWeight: '300',
  },
  sectionHeader: {
    color: '#B5B5B5',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 0.18*0.95*deviceWidth,
    fontSize: 15,
    fontWeight: '400',
    right: 5,
    letterSpacing: 2
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  }
}

export default connect(mapStateToProps, actions)(ExpensesList);