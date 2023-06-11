import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  test('renders home component', () => {
    render(<Home />);
    
    expect(screen.getByRole('heading', { name: /Blogs/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Blog/i })).toBeInTheDocument();
  });

  test('adds a new blog', () => {
    render(<Home />);
    
    // Click the add blog button
    fireEvent.click(screen.getByRole('button', { name: /Add Blog/i }));

    // Enter blog details
    fireEvent.change(screen.getByLabelText('Id'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Subtitle'), { target: { value: 'Subtitle 1' } });
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Title 1' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'Author 1' } });

    // Click the save button
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    // Check if the added blog is displayed in the table
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Subtitle 1')).toBeInTheDocument();
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
  });


});
