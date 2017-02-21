import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Account from './Account';

export default class Home extends Component {

  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    index: 1,
    routes: [
      { key: '1', icon: 'ios-navigate' },
      { key: '2', icon: 'md-add' },
      { key: '3', icon: 'ios-person' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderIndicator = (props) => {
    const { width, position } = props;

    const translateX = Animated.multiply(position, width);

    return (
      <Animated.View style={[ styles.container, { width, transform: [ { translateX } ] } ]}>
        <View style={styles.indicator} />
      </Animated.View>
    );
  };

  _renderIcon = ({ route }: any) => {
    return (
      <Ionicons
        name={route.icon}
        size={24}
        style={styles.icon}
      />
    );
  };

  _renderBadge = ({ route }) => {
    if (route.key === '2') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}></Text>
        </View>
      );
    }
    return null;
  };

  _renderFooter = (props) => {
    return (
      <TabBar
        {...props}
        renderIcon={this._renderIcon}
        //renderBadge={this._renderBadge}
        renderIndicator={this._renderIndicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <View style={[ styles.page, { backgroundColor: '#F5F5F5' } ]} />;
    case '2':
      return <View style={[ styles.page, { backgroundColor: '#F5F5F5' } ]} />;
    case '3':
      return <Account />
    default:
      return null;
    }
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <TabViewAnimated
        style={[ styles.container, this.props.style ]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#202020',
  },
  tab: {
    padding: 12,
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  indicator: {
    flex: 1,
    backgroundColor: '#000',
    // margin: 4,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
