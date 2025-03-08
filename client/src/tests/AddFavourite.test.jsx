import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MealDetails from '../pages/MealDetails/MealDetails.jsx';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Mock react-router-dom for useParams
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

// Mock axios
vi.mock('axios');

describe('MealDetails add to favourite', () => {
  const mockMeal = {
    id: 123,
    title: 'Banana',
    image: 'banana.jpg',
    summary: 'banana meal',
    extendedIngredients: [{ original: 'Banana', measures: { metric: { amount: 1, unitShort: 'pcs' } } }],
    instructions: '<p>Eat banana</p>',
  };

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it('renders meal details', async () => {
    // Mock all three axios calls in the component
    vi.mocked(axios.get).mockResolvedValueOnce({ data: { meal: mockMeal } }); // Meal details
    vi.mocked(axios.get).mockResolvedValueOnce({ data: { meals: [] } });      // Favorites check
    vi.mocked(axios.get).mockResolvedValueOnce({ data: { rating: 0 } });      // User rating

    render(
      <MemoryRouter initialEntries={["/api/meals/details/123"]}>
        <MealDetails loginUser={{ userId: 'user123' }} />
      </MemoryRouter>
    );

    expect(screen.getByText(/No meal details available/i)).toBeInTheDocument(); // Before API call

    await waitFor(() => expect(screen.getByText(/Banana/i, { selector: '.title' })).toBeInTheDocument()); // After API call
  });

  it('adds meal to favourites', async () => {
    axios.get.mockResolvedValueOnce({ data: { meal: mockMeal } });
    axios.get.mockResolvedValueOnce({ data: { meals: [] } }); // Initially not a favourite
    axios.post.mockResolvedValueOnce({ data: { message: 'Added to favourites' } });

    render(<MealDetails loginUser={{ userId: 'user123' }} />, { wrapper: MemoryRouter });

    await waitFor(() => screen.getByText(/Banana/i, { selector: '.title' }));

    const addButton = screen.getByText(/Add to Favourites/i);
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Remove from Favourites/i)).toBeInTheDocument());
  });
});