import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AddContactScreen from '../src/screens/AddContactScreen';

jest.mock('axios');
const axios = require('axios');

describe('AddContactScreen', () => {
  it('submits new contact and navigates back', async () => {
    const mockGoBack = jest.fn();
    axios.post.mockResolvedValueOnce({status: 201});

    const {getByText, getByPlaceholderText} = render(
      <AddContactScreen navigation={{goBack: mockGoBack}} />,
    );

    fireEvent.changeText(getByPlaceholderText('Enter first name'), 'Jane');
    fireEvent.changeText(getByPlaceholderText('Enter last name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Enter age'), '28');
    fireEvent.changeText(getByPlaceholderText('Enter photo URL'), 'url2');

    fireEvent.press(getByText('Add Contact'));

    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });
});
