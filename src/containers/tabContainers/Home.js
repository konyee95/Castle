import React, { Component } from 'react';
import { AppState, Animated, View, Text, StyleSheet, Platform } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { TabViewAnimated, TabBar, TabViewPagerScroll, TabViewPagerAndroid, TabViewPagerPan } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ExpensesList from './ExpensesList';
import Discover from './Discover';
import AddExpenses from './AddExpenses';
import Calendar from './Calendar';
import Account from './Account';

class Home extends Component {

  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    appState: AppState.currentState,
    index: 2,
    routes: [
      { key: '1', icon: 'md-pulse' },
      { key: '2', icon: 'ios-stats' },
      { key: '3', icon: 'md-add' },
      { key: '4', icon: 'ios-calendar' },
      { key: '5', icon: 'ios-settings' },
    ],
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    } else {
      if(this.props.auth.user != null) {
        if (this.props.auth.user.uid && this.props.auth.passcode != null) {
          Actions.backgroundLock()
        }
      }
    }
    this.setState({appState: nextAppState});
  }

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
      return <Discover />
    case '2':
      return <ExpensesList />;
    case '3':
      return <AddExpenses />;
    case '4':
      return <Calendar />;
    case '5':
      return <Account />;
    default:
      return null;
    }
  };

  //disable swipe gesture
  _renderPager = (props) => {
    switch (Platform.OS) {
    case 'ios':
      return (
        <TabViewPagerScroll
          {...props}
          animationEnabled={false}
          swipeEnabled={false}
        />
      );
    case 'android':
      return (
        <TabViewPagerAndroid
          {...props}
          animationEnabled={false}
          swipeEnabled={false}
        />
      );
    default:
      return (
        <TabViewPagerPan
          {...props}
          swipeEnabled={false}
        />
      );
    }
  };

  _configureTransition = () => null;

  render() {
    return (
      <TabViewAnimated
        style={[ styles.container, this.props.style ]}
        navigationState={this.state}
        configureTransition={this._configureTransition}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        renderPager={this._renderPager}
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

const mapStateToProps = (state) => {
  return{
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(Home)