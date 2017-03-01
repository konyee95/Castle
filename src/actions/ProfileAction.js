import firebase from 'firebase';

import {
  GET_USER_PROFILE
} from './types';

export function getUserProfile() {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users/` + currentUser.uid)
      .once('value', (snapshot) => {
        dispatch({
          type: GET_USER_PROFILE,
          payload: snapshot.val()
        });
      });
  };
};