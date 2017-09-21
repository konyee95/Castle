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
      apiKey: "AIzaSyCmXs-IE0jb12gN2xd8i6IROpKmq8spfhs",
      authDomain: "castle-a5dcc.firebaseapp.com",
      databaseURL: "https://castle-a5dcc.firebaseio.com",
      storageBucket: "castle-a5dcc.appspot.com",
      messagingSenderId: "745453466159"
    })
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk), autoRehydrate());
    persistStore(store, {storage: AsyncStorage})
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
