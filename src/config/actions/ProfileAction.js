import FIREBASE from '../firebase';
import {storeData} from '../../utils';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const CLEAR_CHANGE_PASSWORD = 'CLEAR_CHANGE_PASSWORD';
export const CLEAR_UPDATE_PROFILE = 'CLEAR_UPDATE_PROFILE';

export const clearChangePassword = () => {
  return (dispatch) => {
    dispatchSuccess(dispatch, CLEAR_CHANGE_PASSWORD, "");
  }
}

export const clearUpdateProfile = () => {
  return (dispatch) => {
    dispatchSuccess(dispatch, CLEAR_UPDATE_PROFILE, "");
  }
}

export const updateProfile = (data) => dispatch => {
    // LOADING
    dispatchLoading(dispatch, UPDATE_PROFILE);
    
    const dataBaru = {
      uid: data.uid,
      nama: data.nama,
      alamat: data.alamat,
      nohp: data.nohp,
      kota: data.kota,
      provinsi: data.provinsi,
      email: data.email,
      status: 'user',
      avatar: data.updateAvatar ? data.avatarForDB : data.avatarLama,
    };
    return FIREBASE.database()
      .ref('users/' + dataBaru.uid)
      .update(dataBaru)
      .then((response) => {
        //SUKSES
        dispatchSuccess(dispatch, UPDATE_PROFILE, response ? response : []);
        //Local Storage (Async Storage)
        storeData('user', dataBaru);
      })
      .catch((error) => { // ERROR
        dispatchError(dispatch, UPDATE_PROFILE, error.message);
        alert(error.message);
      });
};

// export const changePassword = (data) => dispatch => {
// //LOADING
//     dispatchLoading(dispatch, CHANGE_PASSWORD);

//     //Cek dulu apakah benar email & password lama (login)
//     return FIREBASE.auth()
//       .signInWithEmailAndPassword(data.email, data.password)
//       .then((response) => {
//         //jika sukses maka update password
//         var user = FIREBASE.auth().currentUser;
//         user
//           .updatePassword(data.newPassword)
//           .then(function () {
//             // Update successful.
//             dispatchSuccess(dispatch, CHANGE_PASSWORD, 'Sukses Ganti Password');
//           })
//           .catch(function (error) { // AN HAPPEND ERROR
//             dispatchError(dispatch, CHANGE_PASSWORD, error);
//             alert(error);
//           });
//       })
//       .catch((error) => { // ERROR
//         dispatchError(dispatch, CHANGE_PASSWORD, error.message);
//         alert(error.message);
//       });
// };
