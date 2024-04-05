import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import EditContactScreen from '../src/screens/EditContactScreen';
import axios from 'axios';

jest.mock('axios');
const mockNavigation = {
  navigate: jest.fn(),
};

const mockRoute = {
  params: {
    contact: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: '30',
      photo: 'url1',
    },
  },
};

describe('EditContactScreen', () => {
  it('displays the current contact information', () => {
    const {getByDisplayValue} = render(
      <EditContactScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(getByDisplayValue('John')).toBeTruthy();
    expect(getByDisplayValue('Doe')).toBeTruthy();
    expect(getByDisplayValue('30')).toBeTruthy();
  });

  it('allows editing contact information', () => {
    const {getByDisplayValue, getByPlaceholderText} = render(
      <EditContactScreen navigation={mockNavigation} route={mockRoute} />,
    );

    fireEvent.changeText(getByPlaceholderText('Enter first name'), 'Jane');
    expect(getByDisplayValue('Jane')).toBeTruthy();
  });

  it('submits updated contact information', async () => {
    // Arrange
    axios.put.mockResolvedValueOnce({status: 200});

    const {getByText, getByPlaceholderText} = render(
      <EditContactScreen navigation={mockNavigation} route={mockRoute} />,
    );

    // Act
    fireEvent.changeText(getByPlaceholderText('Enter first name'), 'Jane');
    fireEvent.changeText(getByPlaceholderText('Enter last name'), 'Smith');
    fireEvent.changeText(getByPlaceholderText('Enter age'), '32');
    fireEvent.press(getByText('Update Contact'));

    // Assert
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
    });
  });
});
