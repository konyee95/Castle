import React, { Component } from 'react';
import {
  View,
  Text,
  Easing
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import { InfoBox } from './../../components/common';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Discover extends Component {
  render() {
    const { testShit, centerEverything, container, upper, bottom, contentContainerCustomStyle } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[upper]}>

        </View>
        <View style={[bottom]}>
          <Carousel
            itemWidth={deviceWidth*0.45}
            sliderWidth={deviceWidth}
            inactiveSlideScale={1}
            autoplay={true}
            autoplayInterval={2000}
            animationOptions={{ easing: Easing.elastic(1) }}
            contentContainerCustomStyle={[contentContainerCustomStyle]}
            showsHorizontalScrollIndicator={false}>
            <InfoBox featureText="43.29" featureDesc="Daily Average" dollarSign="$ " />
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
    backgroundColor: '#F5F5F5'
  },
  upper: {
    flex: 8
  },
  bottom: {
    flex: 2,
    marginBottom: 12
  },
  contentContainerCustomStyle: {
    height: 100
  }
}

export default Discover;
