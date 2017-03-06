import React, { Component } from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

import { Actions } from 'react-native-router-flux';

import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ExpenseItem extends Component {

  constructor() {
    super()
    this.state = { 
      category: 'Category',
      iconName: 'ios-infinite', 
      iconColor: '#000' 
    }
  }

  componentWillMount() {
    this.renderCategory(this.props.expenseItem.category)
  }

  renderCategory(category) {
    switch(category) {
      case '001':
        this.setState({ category: 'Food', iconName: 'md-wine', iconColor: '#1DAFEB' });
        break;
      case '002':
        this.setState({ category: 'Entertainment', iconName: 'logo-youtube', iconColor: '#ff4040' });
        break;
      case '003':
        this.setState({ category: 'Loan', iconName: 'ios-aperture', iconColor: '#113374' });
        break;
      case '004':
        this.setState({ category: 'Transport', iconName: 'md-car', iconColor: '#1DBE8F' });
        break;
      case '005':
        this.setState({ category: 'Personals', iconName: 'ios-shirt', iconColor: '#FD7C23' });
        break;
      case '006':
        this.setState({ category: 'Bills', iconName: 'md-cash', iconColor: '#666666' });
        break;
      case '007':
        this.setState({ category: 'Education', iconName: 'md-book', iconColor: '#daa520' });
        break;
      case '008':
        this.setState({ category: 'Others', iconName: 'ios-notifications', iconColor: '#ff7f50' });
        break;
      default:
        break;
    }
  }

  renderIcon() {
    return <Ionicons name={this.state.iconName} color={this.state.iconColor} size={28} />
  }

  render() {
    const { amount, category, date, expenseID, note, time } = this.props.expenseItem;
    const { testShit, container, centerEverything, iconContainer, contentContainer, headerContainer, amountContainer, 
      amountText, noteText, categoryText } = styles;
    return(
      <TouchableOpacity 
        style={container}
        onPress={() => Actions.expensesItemDetail(this.props.expenseItem)}>
        <View style={[iconContainer, centerEverything]}>
          {this.renderIcon()}
        </View>
        <View style={[contentContainer]}>
          <View style={[headerContainer]}>
            <Text style={noteText}>{note}</Text>
            <View style={[amountContainer, centerEverything]}>
              <Text style={categoryText}>$</Text>
              <Text style={[noteText, amountText]}>{amount}</Text>
            </View>
          </View>
          <Text style={categoryText}>{this.state.category}</Text>
        </View>
      </TouchableOpacity>
    )
  }
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
    flexDirection: 'row',
    marginBottom: 3
  },
  amountContainer: {
    flexDirection: 'row'
  },
  amountText: {
    fontWeight: '500',
  },
  noteText: {
    color: '#212121',
    fontSize: 17,
    fontWeight: '400'
  },
  categoryText: {
    color: '#7F7F7F',
    fontSize: 14,
    fontWeight: '400'
  }
}

export default ExpenseItem;
