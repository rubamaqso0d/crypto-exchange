import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  test('renders loading message when user data is empty', () => {
    render(<Dashboard />);
    expect(screen.getByText('Loading coin rates and user data...')).toBeInTheDocument();
  });

  test('renders coin rates table when user data is not empty', () => {
    const userData = {
      coin1: {
        coin_name: 'Bitcoin',
        live_rate: 50000,
      },
      coin2: {
        coin_name: 'Ethereum',
        live_rate: 2500,
      },
    };

    render(<Dashboard userData={userData} />);
    
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('50000')).toBeInTheDocument();
    expect(screen.getByText('Transfer')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('2500')).toBeInTheDocument();
  });
});
