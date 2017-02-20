import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'

import Router from './Router';

export default class App extends Component {
  render() {
    return <Router />;
  }
}
