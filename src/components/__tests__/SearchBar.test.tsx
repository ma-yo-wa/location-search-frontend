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

  it('does not call onSearch if the input is empty', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const submitButton = screen.getByText('Search');
    fireEvent.click(submitButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
