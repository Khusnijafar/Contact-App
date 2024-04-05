import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import axios from 'axios';

jest.mock('axios');

const mockNavigation = {
  navigate: jest.fn(),
};

describe('HomeScreen', () => {
  it('renders loading state initially', async () => {
    axios.get.mockResolvedValueOnce({
      data: {data: []}, // Mock the expected structure of the API response
    });

    const {getByTestId} = render(<HomeScreen navigation={mockNavigation} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('loads and displays contacts', async () => {
    const contacts = [
      {id: 1, firstName: 'John', lastName: 'Doe', age: 30, photo: 'url1'},
      {id: 2, firstName: 'Jane', lastName: 'Doe', age: 25, photo: 'url2'},
    ];

    axios.get.mockResolvedValueOnce({data: {data: contacts}});

    const {getByText, queryByTestId} = render(
      <HomeScreen navigation={mockNavigation} />,
    );

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Jane Doe')).toBeTruthy();
    });
  });
});
