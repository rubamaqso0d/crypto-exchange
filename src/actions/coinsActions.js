import axios from 'axios';
import db from '../db.json'


// export const getCoinRates = async () => {
//     try {
//       const response = await axios.get('.json'); // Replace with the path to your JSON file
//       return response.data.purchased_coins;
//     } catch (error) {
//       console.error('Error fetching coin rates:', error);
//       return {};
//     }
//   };

export const fetchCoinRates = () => {
    return async (dispatch) => {
      try {
        // Fetch coin rates from db.json
        const userData = db.purchased_coins;
  
        dispatch({ type: 'FETCH_COIN_RATES_SUCCESS', payload: userData });
      } catch (error) {
        dispatch({ type: 'FETCH_COIN_RATES_FAILURE', payload: error.message });
      }
    };
  };