import firebase from 'firebase';

import {
  GET_USER_PROFILE
} from './types';

export function getUserProfile(uid) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users/${uid}`)
      .once('value', (snapshot) => {
        dispatch({
          type: GET_USER_PROFILE,
          payload: snapshot.val()
        });
      });
  };
};