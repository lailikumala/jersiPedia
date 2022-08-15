import FIREBASE from '../firebase';
import {storeData} from '../../utils';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../../utils';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (data, password) => dispatch => {
    // LOADING
    dispatchLoading(dispatch, REGISTER_USER);
    return FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then((success) => {
        // Ambil UID, buat dataBaru (data+uid)
        const dataBaru = {...data, uid: success.user.uid,};
        //Simpan ke Realtime Database Firebase
        FIREBASE.database()
          .ref('users/' + success.user.uid)
          .set(dataBaru);

        //SUKSES
        dispatchSuccess(dispatch, REGISTER_USER, dataBaru);
        //Local Storage (Async Storage)
        storeData('user', dataBaru);
      })
      .catch((error) => { // ERROR
        dispatchError(dispatch, REGISTER_USER, error.message);
        alert(error.message);
      });
};

export const loginUser = (email, password) => dispatch => {
    // LOADING
    dispatchLoading(dispatch, LOGIN_USER);
    return FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        // Signed in
        FIREBASE.database()
          .ref('/users/' + success.user.uid)
          .once('value')
          .then((resDB) => {
            if (resDB.val()) {

              //SUKSES
              dispatchSuccess(dispatch, LOGIN_USER, resDB.val());
              //Local Storage (Async Storage)
              storeData('user', resDB.val());
            } else {
              // ERROR
              dispatch({
                type: LOGIN_USER,
                payload: {loading: false, data: false, errorMessage: 'Data User tidak ada'},
              });
              alert('Data User tidak ada');
            }
          });
      })
      .catch((error) => { // ERROR
        dispatchError(dispatch, LOGIN_USER, error.message);
        // alert("Error", error.message);
        console.log("error login", error.message)
      });
};
