import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginUser from './LoginUser';

test('renders LoginUser component', () => {
  render(<LoginUser />);
});

test('calls onLogin function with user data on form submission', () => {
  const mockUser = {
    email: 'test@example.com',
    password: 'password123',
  };
  const mockOnLogin = jest.fn();

  const { getByLabelText, getByText } = render(
    <LoginUser onLogin={mockOnLogin} users={[]} />
  );

  // Fill in the form fields
  fireEvent.change(getByLabelText('Email:'), {
    target: { value: mockUser.email },
  });
  fireEvent.change(getByLabelText('Password:'), {
    target: { value: mockUser.password },
  });

  // Submit the form
  fireEvent.click(getByText('Login'));

  // Assert that the onLogin function is called with the user data
  expect(mockOnLogin).toHaveBeenCalledWith(mockUser);
});
