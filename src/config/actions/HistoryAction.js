import FIREBASE from '../firebase';
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  API_TIMEOUT,
  URL_MIDTRANS_STATUS,
  HEADER_MIDTRANS,
} from '../../utils';

import axios from 'axios';

export const GET_LIST_HISTORY = 'GET_LIST_HISTORY';
export const UPDATE_STATUS = 'UPDATE_STATUS';

export const getListHistory = (uid) => dispatch => {
  //loading
    dispatchLoading(dispatch, GET_LIST_HISTORY);

    return FIREBASE.database()
      .ref('histories')
      .orderByChild('user')
      .equalTo(uid)
      .once('value', (querySnapshot) => {
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_HISTORY, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_HISTORY, error);
        alert(error);
      });
};

export const updateStatus = (order_id) => dispatch => {
  //loading
    dispatchLoading(dispatch, UPDATE_STATUS);

  return  axios({
      method: 'GET',
      url: URL_MIDTRANS_STATUS + `${order_id}/status`,
      headers: HEADER_MIDTRANS,
      timeout: API_TIMEOUT,
    })
      .then((response) => {

        const status =
          response.data.transaction_status === 'settlement' ||
          response.data.transaction_status === 'capture'
            ? 'lunas'
            : response.data.transaction_status ? response.data.transaction_status : 'pending';

        //Update Data History di Firebase
        return FIREBASE.database()
          .ref('histories')
          .child(order_id)
          .update({
            status: status,
          })
          .then((response) => {
              dispatchSuccess(dispatch, UPDATE_STATUS, response ? response : [])
          })
          .catch((error) => {
            dispatchError(dispatch, UPDATE_STATUS, error);
            alert(error);
          });
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_STATUS, error);
        alert(error);
      });
};
