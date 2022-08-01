import {combineReducers} from 'redux';
import GetUser from "./getUser";
import RajaOngkir from './rajaOngkir';
import Auth from './auth';

const reducers = combineReducers({
  GetUser,
  RajaOngkir,
  Auth
})

export default reducers