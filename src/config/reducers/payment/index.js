import {
  SNAP_TRANSACTIONS,
  CLEAR_SNAP_TRANSACTIONS,
} from '../../actions/PaymentAction';

const initialState = {
  snapTransactionsLoading: false,
  snapTransactionsResult: false,
  snapTransactionsError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SNAP_TRANSACTIONS:
      return {
        ...state,
        snapTransactionsLoading: false,
        snapTransactionsResult: false,
        snapTransactionsError: false,
      };

    case SNAP_TRANSACTIONS:
      return {
        ...state,
        snapTransactionsLoading: action.payload.loading,
        snapTransactionsResult: action.payload.data,
        snapTransactionsError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
