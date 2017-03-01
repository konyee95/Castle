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

import Carousel from 'react-native-snap-carousel';

import { InfoBox } from './../../components/common';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Discover extends Component {

  componentDidMount() {
    this.props.getUserProfile(this.props.auth.user.uid)
  }

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
            autoplayInterval={2500}
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
    flex: 8.5
  },
  bottom: {
    flex: 1.5,
    marginBottom: 12
  },
  contentContainerCustomStyle: {
    height: deviceWidth*0.2,
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(Discover);
