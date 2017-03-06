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

import CategoryChart from './../../components/CategoryChart';
import { InfoBox, MonthLabel } from './../../components/common';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Discover extends Component {

  constructor() {
    super();
    this.state = {
      bigAmount: '0',
      smallAmount: '00',
      dailySpending: '0.00',
      totalSpending: '0.00',
      monthlySpending: '0.00',
      balance: '0.00',
      totalIncome: '0.00',
      snapIndex: Moment().month(),
      groupedCategory: []
    }
  }

  componentWillMount() {
    this.groupByCategory(this.props.expenses.expensesObject, this.state.snapIndex)
    this.processExpenses(this.props.expenses.expensesObject, this.state.snapIndex, this.props.income.incomeObject)
  }

  componentDidMount() {
    this.props.getUserProfile(this.props.auth.user.uid)
  }

  componentWillReceiveProps(nextProps) {
    this.groupByCategory(nextProps.expenses.expensesObject, this.state.snapIndex)
    this.processExpenses(nextProps.expenses.expensesObject, this.state.snapIndex, nextProps.income.incomeObject)
  }

  //the category carousel is going to depend on this array
  //return an array
  groupByCategory(expensesObject, snapIndex) {
    let newExpensesObject = expensesObject.filter(item => Moment(item.exactDate).month() === snapIndex)
    let groupedCategory = newExpensesObject.reduce((accumulator, item) => {
        let itemCategory = item.category;
        let matched = accumulator.find((r) => r && r.category === itemCategory);
        if(matched) {
          matched.amount += Number(item.amount);
        } else {
          accumulator.push({
            category: itemCategory,
            amount: +Number(item.amount)
          });
        }
        return accumulator;
      }, [])

      groupedCategory.sort((a, b) => {
        return b.amount - a.amount
      })

    this.setState({ groupedCategory })
  }

  processExpenses(expensesObject, snapIndex, incomeObject) {

    let monthlySpending = 0;  //big amount and small amount
    let daily = 0;
    let totalSpending = 0;

    //NO UID MATCHING REQUIRED BECAUSE THE APP IS OFFLINE FIRST, ALL TRANSACTION BELONGS TO THIS USER ONLY
    expensesObject.forEach((item) => {
      //monthly spending
      if(Moment(item.exactDate).month() === snapIndex) { //snapIndex represents month index
        monthlySpending += Number(item.amount)
      }

      //daily spending
      if((Moment(new Date()).format('YYYY-MM-DD')) === Moment(item.exactDate).format('YYYY-MM-DD')) {
        daily += Number(item.amount)
      }

      //total spending
      totalSpending += Number(item.amount)
    })

    let bigAmount = Math.floor(monthlySpending)
    let smallAmount = (monthlySpending - bigAmount).toFixed(2).toString().split('.')[1]
    let dailySpending = daily.toFixed(2).toString()

    //calculate totalIncome and balance
    let totalIncome = 0;
    incomeObject.forEach((item) => {
      totalIncome += Number(item.amount)
    })
    let balance = (totalIncome - totalSpending).toFixed(2).toString()

    this.setState({ 
      bigAmount, 
      smallAmount, 
      dailySpending, 
      monthlySpending,
      totalSpending,
      totalIncome,
      balance
    });
  }

  onSnapToItem(snapIndex) {
    this.setState({ snapIndex })
    this.processExpenses(this.props.expenses.expensesObject, snapIndex, this.props.income.incomeObject)
  }

  renderCategoryIndicator() {
    let views = [];
    for (var i = 0; i < 10; i++) {
      views.push(
        <View key={i} style={{ flexDirection: 'row', paddingBottom: 3 }}>
          { 
            i===0 ? <Text style={styles.amountIndicatorText}>{Math.ceil(this.state.totalSpending)}</Text> : 
            i===5 ? <Text style={styles.amountIndicatorText}>{Math.ceil(this.state.totalSpending/2)}</Text> : 
            <Text style={styles.amountIndicatorText}></Text>
          }
          <Text style={styles.amountIndicator}>-</Text>
        </View>
        )
    }
    return views;
  }

  renderCategoryCarousel() {
    let views = []
    let items = this.state.groupedCategory
    let monthlySpending = this.state.monthlySpending

    items.forEach((item) => {
      views.push(
        <CategoryChart 
          key={item} 
          percentage={(item.amount/monthlySpending*100).toFixed(0)} 
        />
      )
    })

    return views;
  }

  render() {
    console.log(this.state.groupedCategory)
    const { testShit, centerEverything, container, upper, middle, amountIndicatorContainer, amountIndicator, categoryCarouselContainer,
      bottom, monthCarousel, monthIndicator, amountContainer, contentContainerCustomStyle, title, desc, featureLabel } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[upper]}>

          <View style={[monthCarousel]}>
            <Text style={monthIndicator}>|</Text>
            <Carousel
              firstItem={this.state.snapIndex}
              itemWidth={deviceWidth*0.33}
              sliderWidth={deviceWidth}
              inactiveSlideOpacity={0.3}
              animationOptions={{ easing: Easing.elastic(1) }}
              contentContainerCustomStyle={[]}
              showsHorizontalScrollIndicator={false}
              onSnapToItem={(snapIndex) => this.onSnapToItem(snapIndex)}>
              <MonthLabel label="JANUARY" />
              <MonthLabel label="FEBUARY" />
              <MonthLabel label="MARCH" />
              <MonthLabel label="APRIL" />
              <MonthLabel label="MAY" />
              <MonthLabel label="JUNE" />
              <MonthLabel label="JULY" />
              <MonthLabel label="AUGUST" />
              <MonthLabel label="SEPTEMBER" />
              <MonthLabel label="OCTOBER" />
              <MonthLabel label="NOVEMBER" />
              <MonthLabel label="DECEMBER" />
            </Carousel>
          </View>


          <View style={[centerEverything, { paddingTop: 30 } ]}>
            <Text style={title}>Total Expenses</Text>
            <View style={[amountContainer, centerEverything]}>
              <Text style={desc}>$ </Text>
              <Text style={[desc, featureLabel]}>{this.state.bigAmount}</Text>
              <Text style={desc}>.{this.state.smallAmount}</Text>
            </View>
          </View>

        </View>

        <View style={[middle]}>
          <View style={[amountIndicatorContainer]}>
            {this.renderCategoryIndicator()}
          </View>
          <View style={[categoryCarouselContainer]}>
            <Carousel
              firstItem={0}
              itemWidth={deviceWidth*0.18}
              sliderWidth={deviceWidth}
              inactiveSlideOpacity={0.95}
              inactiveSlideScale={0.95}
              animationOptions={{ easing: Easing.elastic(1) }}
              contentContainerCustomStyle={[{ position: 'absolute', top: 42 }]}
              showsHorizontalScrollIndicator={false}>
              {this.renderCategoryCarousel()}
            </Carousel>
          </View>
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
            <InfoBox featureText={this.state.balance} featureDesc="Balance" dollarSign="$ " />
            <InfoBox featureText={this.state.totalIncome} featureDesc="Total Income" dollarSign="$ " />
            <InfoBox featureText={this.state.totalSpending} featureDesc="Total Spending" dollarSign="$ " />
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
    flex: 2.5,
    width: deviceWidth,
    paddingTop: 4
  },
  middle: {
    flex: 6,
    flexDirection: 'row',
    width: deviceWidth,
  },
  amountIndicatorContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  amountIndicatorText: {
    color: '#737373',
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: '400',
    paddingRight: 10
  },
  amountIndicator: {
    color: '#D6D6D6',
    fontSize: 20
  },
  categoryCarouselContainer: {
    flex: 8,
    alignItems: 'center',
    paddingLeft: 20
  },
  bottom: {
    flex: 1.5,
    marginBottom: 12
  },
  monthCarousel: {
    width: deviceWidth,
    alignItems: 'center',
  },
  monthIndicator: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  amountContainer: {
    flexDirection: 'row',
    // paddingTop: 8
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
    expenses: state.expenses,
    income: state.income
  };
};

export default connect(mapStateToProps, actions)(Discover);
