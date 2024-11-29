import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchResults } from '../SearchResults';
import { SearchResult } from '../../types';

describe('SearchResults', () => {
  it('renders no results found message', () => {
    render(<SearchResults results={[]} loading={false} onResultClick={() => {}} />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('renders search results', () => {
    const mockResults: SearchResult[] = [
      {
        street: '123 Main St',
        city: 'Anytown',
        zipCode: '12345',
        county: 'Any County',
        country: 'USA',
        latitude: 40.7128,
        longitude: -74.0060,
        score: 0.95,
        timeZone: 'EST',
      },
      {
        street: '456 Elm St',
        city: 'Othertown',
        zipCode: '67890',
        county: 'Other County',
        country: 'USA',
        latitude: 34.0522,
        longitude: -118.2437,
        score: 0.85,
        timeZone: 'PST',
      },
    ];

    render(<SearchResults results={mockResults} loading={false} onResultClick={() => {}} />);
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Anytown, 12345')).toBeInTheDocument();
    expect(screen.getByText('95% match')).toBeInTheDocument();
    expect(screen.getByText('456 Elm St')).toBeInTheDocument();
    expect(screen.getByText('Othertown, 67890')).toBeInTheDocument();
    expect(screen.getByText('85% match')).toBeInTheDocument();
  });

  it('calls onResultClick when a result is clicked', () => {
    const mockResults: SearchResult[] = [
      {
        street: '123 Main St',
        city: 'Anytown',
        zipCode: '12345',
        county: 'Any County',
        country: 'USA',
        latitude: 40.7128,
        longitude: -74.0060,
        score: 0.95,
        timeZone: 'EST',
      },
    ];

    const mockOnResultClick = vi.fn();
    render(<SearchResults results={mockResults} loading={false} onResultClick={mockOnResultClick} />);

    const resultItem = screen.getByText('123 Main St');
    resultItem.click();

    expect(mockOnResultClick).toHaveBeenCalledWith(mockResults[0]);
  });
});
