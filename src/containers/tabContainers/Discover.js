import React, { Component } from 'react';
import {
  View,
  Text,
  Easing,
  PixelRatio
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import Moment from 'moment';
import Carousel from 'react-native-snap-carousel';

import { InfoBox } from './../../components/common';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Discover extends Component {

  constructor() {
    super();
    this.state = {
      bigAmount: '0',
      smallAmount: '00',
      dailySpending: '0.00'
    }
  }

  componentDidMount() {
    this.props.getUserProfile(this.props.auth.user.uid)
    this.renderAmount()
  }

  renderAmount() {
    let integer = 0;
    let daily = 0;
    let expensesArray = this.props.expenses.expensesObject;
    
    expensesArray.forEach((item) => {
      integer += Number(item.amount)
      if((Moment(new Date()).format('YYYY-MM-DD')) === Moment(item.exactDate).format('YYYY-MM-DD')) {
        daily += Number(item.amount)
      }
    })

    let bigAmount = Math.floor(integer)
    let smallAmount = (integer - bigAmount).toFixed(2).toString().split('.')[1]
    let dailySpending = daily.toFixed(2).toString()

    this.setState({ bigAmount, smallAmount, dailySpending })
  }

  render() {
    const { testShit, centerEverything, container, upper, middle, bottom, amountContainer, contentContainerCustomStyle,
    title, desc, featureLabel } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[upper, centerEverything]}>
          <View style={[centerEverything]}>
            <Text style={title}>Total Expenses</Text>
            <View style={[amountContainer, centerEverything]}>
              <Text style={desc}>$ </Text>
              <Text style={[desc, featureLabel]}>{this.state.bigAmount}</Text>
              <Text style={desc}>.{this.state.smallAmount}</Text>
            </View>
          </View>
        </View>
        <View style={[middle]}>

        </View>
        <View style={[bottom]}>
          <Carousel
            itemWidth={deviceWidth*0.45}
            sliderWidth={deviceWidth}
            inactiveSlideScale={1}
            autoplay={true}
            autoplayInterval={2500}
            animationOptions={{ easing: Easing.elastic(1) }}
            contentContainerCustomStyle={[contentContainerCustomStyle]}
            showsHorizontalScrollIndicator={false}>
            <InfoBox featureText={this.state.dailySpending} featureDesc="Daily Spending" dollarSign="$ " />
            <InfoBox featureText="Overspent" featureDesc="Analysis" />
            <InfoBox featureText="1080.90" featureDesc="Monthly" dollarSign="$ " />
          </Carousel>
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
  upper: {
    flex: 3,
  },
  middle: {
    flex: 5.5,
  },
  bottom: {
    flex: 1.5,
    marginBottom: 12
  },
  amountContainer: {
    flexDirection: 'row',
    paddingTop: 8
  },
  contentContainerCustomStyle: {
    height: deviceWidth*0.2,
  },
  title: {
    color: '#707070',
    fontSize: 13,
    fontWeight: '400',
  },
  desc: {
    color: '#B5B5B5',
    fontSize: 26,
    fontFamily: 'Heiti SC',
    fontWeight: '400',
  },
  featureLabel: {
    color: '#000',
    fontSize: 34
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    expenses: state.expenses
  };
};

export default connect(mapStateToProps, actions)(Discover);
