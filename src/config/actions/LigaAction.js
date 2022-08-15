import FIREBASE from '../firebase';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../../utils';

export const GET_LIST_LIGA = 'GET_LIST_LIGA';
export const GET_DETAIL_LIGA = 'GET_DETAIL_LIGA';

export const getListLiga = () => dispatch => {
  //loading
    dispatchLoading(dispatch, GET_LIST_LIGA);

    return FIREBASE.database()
      .ref('ligas')
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        dispatchSuccess(dispatch, GET_LIST_LIGA, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_LIGA, error);
        alert(error);
      });
};

export const getDetailLiga = (id) => dispatch => {
  //loading
    dispatchLoading(dispatch, GET_DETAIL_LIGA);

    return FIREBASE.database()
      .ref('ligas/'+id)
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        dispatchSuccess(dispatch, GET_DETAIL_LIGA, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_LIGA, error);
        alert(error);
      });
};
