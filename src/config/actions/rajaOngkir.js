import axios from "axios";
import {API_HEADER_RAJAONGKIR, API_RAJAONGKIR, API_TIMEOUT} from "../../utils/constant";
import {dispatchError, dispatchLoading, dispatchSuccess} from '../../utils';

export const GET_PROVINCE = 'GET_PROVINCE';
export const GET_CITY     = 'GET_CITY';

export const getProvinceList = () => dispatch => {
    //loading
    dispatchLoading(dispatch, GET_PROVINCE)

    return axios({
        method: 'GET',
        url:    `${API_RAJAONGKIR}/province`,
        timeout: API_TIMEOUT,
        headers: API_HEADER_RAJAONGKIR
    })
    .then((res) =>{
        if(res.status !== 200) {
            //error
            dispatchError(dispatch, GET_PROVINCE, res)
        } else {
            //success
            dispatchSuccess(dispatch, GET_PROVINCE, res.data ? res.data.rajaongkir.results : [])
        }
    }) //error
    .catch((error) => dispatchError(dispatch, GET_PROVINCE, error))
}

export const getCityList = province_id => dispatch => {
    //loading
    dispatchLoading(dispatch, GET_CITY)
    return axios({
        method: 'GET',
        url:    `${API_RAJAONGKIR}/city?province=${province_id}`,
        timeout: API_TIMEOUT,
        headers: API_HEADER_RAJAONGKIR
    })
    .then((res) =>{
        if(res.status !== 200) {
            //error
            dispatchError(dispatch, GET_CITY, res)
        } else {
            //success
            dispatchSuccess(dispatch, GET_CITY, res.data ? res.data.rajaongkir.results : [])
        }
    }) //error
    .catch((error) => dispatchError(dispatch, GET_CITY, error))
}