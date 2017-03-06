import React, { Component } from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

export default class CategoryChart extends Component {

  constructor() {
    super()
    this.state = { 
      category: 'Category',
      iconName: 'ios-infinite', 
      iconColor: '#000',
      shadow: false
    }
  }

  componentWillMount() {
    this.renderCategory(this.props.category)
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
    return <Ionicons 
              name={this.state.iconName} 
              color={this.state.iconColor} 
              size={28}
              />
  }

  renderIndicator() {
    const { id, percentage, category, categoryIndex } = this.props;
    if(id === categoryIndex) {
      return (
        <View style={[styles.activeIndicator, { backgroundColor: this.state.iconColor}]} />
      );
    } else {
      return <View />
    }
  }

  render() {
    const { bitOfShadow, container, containerWithShadow, activeIndicator, iconContainer, bottomContainer, centerStyle, text } = styles;
    const { id, percentage, category, categoryIndex } = this.props;
    return( 
      <View style={ id===categoryIndex ? containerWithShadow : container}>
        {this.renderIndicator()}
        <View style={ iconContainer }>
          {this.renderIcon()}
        </View>
        <View style={[ bottomContainer, { backgroundColor: this.state.iconColor, height: deviceHeight*0.38*percentage/100}]}>
          <Text style={text}>{percentage}%</Text>
        </View>
        
      </View>
    )
  }
}

const styles = {
  bitOfShadow: {
    shadowColor: '#D3D3D3',
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1
  },
  container: {
    width: deviceWidth*0.18,
    height: deviceHeight*0.38,
    marginRight: 2,
    backgroundColor: '#FFF'
  },
  containerWithShadow: {
    width: deviceWidth*0.18,
    height: deviceHeight*0.38,
    marginRight: 2,
    backgroundColor: '#FFF',
    shadowColor: '#D3D3D3',
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    height: 2,
    width: deviceWidth*0.18,
  },
  iconContainer: {
    height: 75,
    width: deviceWidth*0.18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth*0.18,
    justifyContent: 'flex-end'
  },
  centerStyle: {
    backgroundColor: '#FFF'
  },
  text: {
    color: '#FFF',
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    paddingBottom: 6,
    backgroundColor: 'transparent'
  }
}
