import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import reducers from './reducers';
import Router from './Router';

export default class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBBlGt-AktUSi044XAehDi_JFMOAdiVCO8",
      authDomain: "castle-6b25a.firebaseapp.com",
      databaseURL: "https://castle-6b25a.firebaseio.com",
      storageBucket: "castle-6b25a.appspot.com",
      messagingSenderId: "434788124131"
    })
  }

  render() {
    console.log(this.state);
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk), autoRehydrate());
    persistStore(store, {storage: AsyncStorage})
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
