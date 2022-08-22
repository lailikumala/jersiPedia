import {
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  CLEAR_CHANGE_PASSWORD,
  CLEAR_UPDATE_PROFILE,
} from '../../actions/ProfileAction';

const initialState = {
  updateProfileLoading: false,
  updateProfileResult: false,
  updateProfileError: false,

  changePasswordLoading: false,
  changePasswordResult: false,
  changePasswordError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        updateProfileLoading: action.payload.loading,
        updateProfileResult: action.payload.data,
        updateProfileError: action.payload.errorMessage,
      };

    case CLEAR_UPDATE_PROFILE:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileResult: false,
        updateProfileError: false,
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordLoading: action.payload.loading,
        changePasswordResult: action.payload.data,
        changePasswordError: action.payload.errorMessage,
      };

    case CLEAR_CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordResult: false,
        changePasswordError: false,
      };
    default:
      return state;
  }
}
