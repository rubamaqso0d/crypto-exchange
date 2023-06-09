import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoinRates } from '../actions/coinsActions';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'

const Dashboard = () => {
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinRates());
  }, [dispatch]);

  if (!userData || Object.keys(userData).length === 0) { // Check if userData is empty or not
    return <p className="loading">Loading coin rates and user data...</p>;
  }

  const handleTransfer = (coinId) => {
    navigate(`/transfer/${coinId}`);
  };

  const coinRateEntries = Object.entries(userData); // Convert object to array
  console.log(userData)
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {coinRateEntries.length > 0 ? (
        <table className="coin-table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Rate</th>
              <th>Transfer</th>
            </tr>
          </thead>
          <tbody>
            {coinRateEntries.map(([coinId, coin]) => ( // Modify the parameter names
              <tr key={coinId}>
                <td>{coin.coin_name}</td> 
                <td>{coin.live_rate}</td>
                <td>
                  <button
                    className="transfer-button"
                    onClick={() => handleTransfer(coinId)}
                  >
                    Transfer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-rates">No coin rates available.</p>
      )}
    </div>
  );
};

export default Dashboard;
