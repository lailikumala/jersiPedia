const initialState = {
    data: [],
    loading: false,
  };
  
  const GetUser = (state = initialState, action = {}) => {
    switch (action.type) {
      case "GET_USER":
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  export default GetUser;