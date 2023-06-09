import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './TransferCoins.css'; // Import the CSS file for styling
import { toast, ToastContainer } from 'react-toastify';

const TransferCoins = () => {
  const { coinId } = useParams();
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();

  const [coin, setCoin] = useState(null);
  const [transferAddress, setTransferAddress] = useState('');
  const [coinChain, setCoinChain] = useState('');

  useEffect(() => {
    if (userData.length > 0) {
      const selectedCoin = userData.find(
        (coinItem) => coinItem.coin_id === coinId
      );

      if (selectedCoin) {
        setCoin(selectedCoin);
      } else {
        alert('Coin not found');
        navigate('/dashboard');
      }
    }
  }, [userData, coinId, navigate]);

  const handleTransfer = (e) => {
    e.preventDefault();
     toast.success('Transfer successful!', {
      
      });
      navigate('/dashboard');
  };

  if (!coin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleTransfer}>
        <h2 className="Auth-form-title">Transfer Coins</h2>
        
        <div className="Auth-form-content">
          <div>
            <label className="form-group mt-3">Transfer Address:</label>
            <input
            className="form-control mt-1"
            type="text"
            value={transferAddress}
            required
            onChange={(e) => setTransferAddress(e.target.value)}
          />
          </div>
          <div>
            <label className="form-group mt-3"> Coin Chain:</label>
            <select
            className="form-control mt-1"
            value={coinChain}
            onChange={(e) => setCoinChain(e.target.value)}
     
            required
          >
            <option value="">Select Coin Chain</option>
            <option value={coin.chain}>{coin.chain}</option>
          </select>
          </div>
          <button className="d-grid gap-2 mt-3 btn btn-primary" type="submit">
          Transfer
          </button>
          
        </div>
      </form>
      <ToastContainer />
    </div>
  
  );
};

export default TransferCoins;
