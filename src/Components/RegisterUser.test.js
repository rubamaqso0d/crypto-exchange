import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterUser from './RegisterUser';

describe('RegisterUser', () => {
  test('renders register form', () => {
    render(<RegisterUser onRegister={() => {}} users={[]} setUsers={() => {}} />);

    // Check if the register form elements are rendered
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Home Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('CNIC')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    expect(screen.getByText(/Already registered?/i)).toBeInTheDocument();
  });

  test('calls onRegister when register button is clicked', () => {
    const mockOnRegister = jest.fn();
    const mockSetUsers = jest.fn();
    render(<RegisterUser onRegister={mockOnRegister} users={[]} setUsers={mockSetUsers} />);

    // Enter form data
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Home Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    const file = new File(['(pdf content)'], 'cnic.pdf', { type: 'application/pdf' });
    fireEvent.change(screen.getByLabelText('CNIC'), { target: { files: [file] } });

    // Click the register button
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    // Check if onRegister function is called with the correct form data
    expect(mockOnRegister).toHaveBeenCalledWith({
      firstName: '2',
      lastName: '3',
      address: '123',
      email: '2@abc.com',
      password: '2@abc.com',
      cnic: expect.any(String), // The base64-encoded value of the PDF file
    });

    // Check if the setUsers function is called
    expect(mockSetUsers).toHaveBeenCalled();
  });
});
