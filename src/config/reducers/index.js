import { combineReducers } from 'redux'
import RajaOngkirReducer from './rajaongkir'
import AuthReducer from './auth'
import ProfileReducer from './profile'
import LigaReducer from './liga'
import JerseyReducer from './jersey'
import KeranjangReducer from './keranjang'
import PesananReducer from './pesanan'
import HistoryReducer from './history'
import PaymentReducer from './payment'

const rootReducer = combineReducers({
    RajaOngkirReducer,
    AuthReducer,
    ProfileReducer,
    LigaReducer,
    JerseyReducer,
    KeranjangReducer,
    PesananReducer,
    HistoryReducer,
    PaymentReducer,
});

export default rootReducer