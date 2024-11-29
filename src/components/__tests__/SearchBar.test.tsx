import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { SearchBar } from '../SearchBar';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('SearchBar', () => {
  it('renders search input and button', () => {
    render(<SearchBar onSearch={async () => {}} />);

    expect(screen.getByPlaceholderText('Search locations...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('calls onSearch with correct parameters when form is submitted', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search locations...');
    fireEvent.change(input, { target: { value: 'New York' } });

    const submitButton = screen.getByText('Search');
    fireEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('New York', { latitude: undefined, longitude: undefined });
  });

  it('shows error message when only latitude is provided', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    // Open the coordinates input section
    const toggleButton = screen.getByText(/enter coordinates manually/i);
    fireEvent.click(toggleButton);

    const latitudeInput = screen.getByLabelText('Latitude');
    fireEvent.change(latitudeInput, { target: { value: '40' } });

    const submitButton = screen.getByText('Search');
    fireEvent.click(submitButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(screen.getByText(/longitude is required when latitude is provided/i)).toBeInTheDocument();
  });

  it('shows error message when only longitude is provided', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    // Open the coordinates input section
    const toggleButton = screen.getByText(/enter coordinates manually/i);
    fireEvent.click(toggleButton);

    const longitudeInput = screen.getByLabelText('Longitude');
    fireEvent.change(longitudeInput, { target: { value: '-74' } });

    const submitButton = screen.getByText('Search');
    fireEvent.click(submitButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(screen.getByText(/latitude is required when longitude is provided/i)).toBeInTheDocument();
  });
});
