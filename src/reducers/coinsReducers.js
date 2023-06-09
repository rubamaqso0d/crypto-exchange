import db from '../db.json';
const initialState = {

    userData: db.purchased_coins,
  
  loading: false,
  error: null,
};

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COIN_RATES_SUCCESS':
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_COIN_RATES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default coinsReducer;