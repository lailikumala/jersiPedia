import { GET_PROVINCE, GET_CITY } from "../actions/rajaOngkir";

const initialState = {
  ProvinceLoading: false,
  ProvinceResult: false,
  ProvinceError: false,

  CityLoading: false,
  CityResult: false,
  CityError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROVINCE:
      return {
        ...state,
        ProvinceLoading: action.payload.loading,
        ProvinceResult: action.payload.data,
        ProvinceError: action.payload.errorMessage,
      };

    case GET_CITY:
      return {
        ...state,
        CityLoading: action.payload.loading,
        CityResult: action.payload.data,
        CityError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
