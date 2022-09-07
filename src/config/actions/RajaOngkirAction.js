import axios from 'axios';
import {
  API_HEADER_RAJAONGKIR,
  API_RAJAONGKIR,
  API_TIMEOUT,
  API_HEADER_RAJAONGKIR_COST,
  ORIGIN_CITY
} from '../../utils/constant';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../../utils';

export const GET_PROVINSI = 'GET_PROVINSI';
export const GET_KOTA = 'GET_KOTA';
export const GET_KOTA_DETAIL = 'GET_KOTA_DETAIL';
export const POST_ONGKIR = 'POST_ONGKIR'

export const getProvinsiList = () =>  dispatch => {
    // LOADING
    dispatchLoading(dispatch, GET_PROVINSI);
    return axios({
      method: 'get',
      url: `${API_RAJAONGKIR}/province`,
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then((response) => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, GET_PROVINSI, response);
        } else {
          //SUKSES
          dispatchSuccess(dispatch, GET_PROVINSI, response.data ? response.data.rajaongkir.results : []);
        }
      })
      .catch((error) => { // ERROR
        dispatchError(dispatch, GET_PROVINSI, error);
        alert("provinsi", error);
      });
};

export const getKotaList = (provinsi_id) => dispatch => {
    // LOADING
    console.log("action kota", provinsi_id)
    dispatchLoading(dispatch, GET_KOTA);
    return axios({
      method: 'get',
      url: `${API_RAJAONGKIR}/city?province=${provinsi_id}`,
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then((response) => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, GET_KOTA, response);
        } else {
          //SUKSES
          dispatchSuccess(dispatch, GET_KOTA, response.data ? response.data.rajaongkir.results : []);
        }
      })
      .catch((error) => { // ERROR
        dispatchError(dispatch, GET_KOTA, error);
        alert("kota",error);
      });
};

export const getKotaDetail = (kota_id) => dispatch => {
    // LOADING
    dispatchLoading(dispatch, GET_KOTA_DETAIL);
    return axios({
      method: 'get',
      url: `${API_RAJAONGKIR}/city?id=${kota_id}`,
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then((response) => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, GET_KOTA_DETAIL, response);
        } else {
          //SUKSES
          dispatchSuccess(dispatch, GET_KOTA_DETAIL, response.data ? response.data.rajaongkir.results : []);
        }
      })
      .catch((error) => { // ERROR
        dispatchError(dispatch, GET_KOTA_DETAIL, error);
        alert(error);
      });
};

// export const postOngkir = (data, ekspedisi) => dispatch => {
//   //LOADING
//   dispatchLoading(dispatch, POST_ONGKIR);
  
//   const formData = new URLSearchParams();
//   formData.append('origin', ORIGIN_CITY);
  
//   // --> destination data.profile.kota 
//   formData.append('destination', data.profile.kota);
  
//   // --> berat => data.totalBerat
//   formData.append('weight', data.totalBerat < 1 ? 1000 : data.totalBerat*1000);
  
//   // --> courier => ekspedisi.kurir
//   formData.append('courier', ekspedisi.kurir);
  
//   console.log("dataaaaaaa", formData)
//     return axios({
//       method: 'POST',
//       url: `${API_RAJAONGKIR}/cost`,
//       timeout: API_TIMEOUT,
//       headers: API_HEADER_RAJAONGKIR_COST,
//       data: formData
//     })
//       .then((response) => {
//         console.log("hasillll", response)

//         if (response.status !== 200) {
//           // ERROR
//           dispatchError(dispatch, POST_ONGKIR, response);
//         } else {
//           const ongkirs = response.data.rajaongkir.results[0].costs;
//           const ongkirYangDipilih = ongkirs
//           .filter((ongkir) => ongkir.service === ekspedisi.service).map((filterOngkir) => {
//             return filterOngkir
//           });

//           //SUKSES
//           dispatchSuccess(dispatch, POST_ONGKIR, ongkirYangDipilih[0]);
//         }
//       })
//       .catch((error) => { // ERROR
//         dispatchError(dispatch, POST_ONGKIR, error);
//         console.log("response error", error)
//         alert(error.response);
//       })
// }


export const postOngkir = (data, ekspedisi) => dispatch => {
  //loading
    dispatchLoading(dispatch, POST_ONGKIR);
    return axios({
      method: "POST",
      url: `${API_RAJAONGKIR}/cost`,
      headers: API_HEADER_RAJAONGKIR,
      data: {
        origin: ORIGIN_CITY,
        destination: data.profile.kota,
        weight: data.totalBerat < 1 ? 1000 : data.totalBerat*1000,
        courier: ekspedisi.kurir
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, POST_ONGKIR, response);
        } else {
          const ongkirs = response.data.rajaongkir.results[0].costs;
          const ongkirYangDipilih = ongkirs
          .filter((ongkir) => ongkir.service === ekspedisi.service).map((filterOngkir) => {
            return filterOngkir
          });

          //SUKSES
          dispatchSuccess(
            dispatch,
            POST_ONGKIR,
            ongkirYangDipilih[0],
          );
        }
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, POST_ONGKIR, error);
        console.log("errror", error)
        alert(error);
      })

}
