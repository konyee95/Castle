import React, { Component } from 'react';
import {
  Alert,
  View,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ExpensesItemDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: 'CATEGORY',
      iconName: 'ios-infinite', 
      themeColor: '#1F1F1F' ,
      bigAmount: '0',
      smallAmount: '00',
      note: 'Spending note',
      date: '',
    }
  }

  componentWillMount() {
    const { category, amount, note, exactDate } = this.props;
    this.renderCategory(category)
    this.processData(amount, note, exactDate)
  }

  processData(amount, note, exactDate) {
    let bigAmount = Math.floor(amount)
    let smallAmount = (amount - bigAmount).toFixed(2).toString().split('.')[1]
    
    this.setState({
      bigAmount,
      smallAmount,
      note,
      date: Moment(exactDate).format('MMMM D, YYYY')
    })
  }

  deleteExpensesItem() {
    Alert.alert('Delete Entry', 'Are you sure? This cannot be undone', [
      {text: 'No', onPress: () => console.log('Cancel')},
      {text: 'Yes', onPress: () => {
        this.props.deleteExpensesItem(this.props)
        Actions.pop()
      }},
    ])
  }

  renderCategory(category) {
    switch(category) {
      case '001':
        this.setState({ category: 'FOOD', iconName: 'md-wine', themeColor: '#1DAFEB' });
        break;
      case '002':
        this.setState({ category: 'ENTERTAINMENT', iconName: 'logo-youtube', themeColor: '#ff4040' });
        break;
      case '003':
        this.setState({ category: 'LOAD', iconName: 'ios-aperture', themeColor: '#3B5998' });
        break;
      case '004':
        this.setState({ category: 'TRANSPORT', iconName: 'md-car', themeColor: '#F7923A' });
        break;
      case '005':
        this.setState({ category: 'PERSONALS', iconName: 'ios-shirt', themeColor: '#0099cc' });
        break;
      case '006':
        this.setState({ category: 'BILLS', iconName: 'md-cash', themeColor: '#666666' });
        break;
      case '007':
        this.setState({ category: 'EDUCATION', iconName: 'md-book', themeColor: '#daa520' });
        break;
      case '008':
        this.setState({ category: 'OTHERS', iconName: 'ios-notifications', themeColor: '#ff7f50' });
        break;
      default:
        break;
    }
  }

  render() {
    console.log(this.props)
    const { testShit, centerEverything, container, buttonsContainer, contentContainer, categoryContainer, 
      categoryName, figureContainer, figureTextContainer, figureText, figureTextFeature, itemContainer, noteText, dateStyle, visualContainer, visualText } = styles;
    return(
      <View style={[container]}>
        <View style={[buttonsContainer]}>
          <Ionicons name="md-arrow-back" size={25} color="#1F1F1F" onPress={() => Actions.pop()}/>
          <Ionicons name="md-trash" size={25} color="#1F1F1F" onPress={() => this.deleteExpensesItem()}/>
        </View>
        <View style={[contentContainer]}>
          <View style={[categoryContainer, { backgroundColor: this.state.themeColor }]}>
            <Ionicons name={this.state.iconName} size ={23} color="#FFF" />
            <Text style={categoryName}>{this.state.category}</Text>
          </View>
          <View style={[figureContainer]}>
            <View style={[figureTextContainer]}>
              <Text style={figureText}>$ </Text>
              <Text style={figureTextFeature}>{this.state.bigAmount}</Text>  
              <Text style={figureText}> .{this.state.smallAmount}</Text>  
            </View>
            <View style={itemContainer}>
              <Text style={noteText}>{this.state.note}</Text>
              <View style={{ flexDirection: 'row', paddingTop: 15, alignItems: 'center'}}>
                <Ionicons name="md-calendar" color="#707070" size={18} />
                <Text style={dateStyle}>{this.state.date}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[visualContainer, centerEverything]}>
          <Text style={visualText}>COMING SOON</Text>
        </View>
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
    backgroundColor: '#F5F5F5',
    paddingTop: 24,
    width: deviceWidth
  },
  buttonsContainer: {
    flex: .07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10
  },
  contentContainer: {
    flex: .58,
    width: deviceWidth*0.8,
    alignSelf: 'flex-end'
  },
  categoryContainer: {
    flex: .2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Bold',
    letterSpacing: 3,
    color: '#FFF'
  },
  figureContainer: {
    flex: .8,
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  figureTextContainer: {
    flex: .5,
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth*0.8
  },
  figureText: {
    color: '#B5B5B5',
    fontSize: 34
  },
  figureTextFeature: {
    color: '#3B3B3B',
    fontSize: 60
  },
  itemContainer: {
    flex: .5,
    width: deviceWidth*0.8,
  },
  noteText: {
    fontSize: 20,
    fontFamily: 'Helvetica-Light',
  },
  dateStyle: {
    color: '#707070',
    fontSize: 18,
    fontFamily: 'Helvetica-Light',
    paddingLeft: 10
  },
  visualContainer: {
    flex: .35,
    backgroundColor: '#1F1F1F'
  },
  visualText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'HelveticaNeue-Bold',
    letterSpacing: 3
  }
}

export default connect(null, actions)(ExpensesItemDetail);