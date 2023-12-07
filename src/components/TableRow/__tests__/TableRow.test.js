import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom matchers
import { Provider } from 'react-redux'; // If you're using Redux
import { TableRow } from '../TableRow'; 
import configureStore from 'redux-mock-store'; // Import the mock store creator

const mockStore = configureStore(); // Create a mock Redux store

const initialState = {
  apps: {
    columnHeaderName: 'Name',
    columnHeaderEmail: 'Email',
    columnHeaderRole: 'Role',
    allUsers: [
      {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        role: 'Admin',
        showNormal: true,
        showInput: false,
      },
      {
        id: 2,
        name: 'User 2',
        email: 'user2@example.com',
        role: 'User',
        showNormal: true,
        showInput: false,
      },
      {
        id: 3,
        name: 'User 3',
        email: 'user3@example.com',
        role: 'Admin',
        showNormal: true,
        showInput: false
      }
      // Add more user objects as needed
    ],
  },
};

let mockstore;
let component;

beforeEach(() => {
  mockstore = mockStore(initialState);

  component = render(
    <Provider store={mockstore}>
      <TableRow />
    </Provider>
  );
});

test('Check and Uncheck "Select All" Checkbox', () => {
  // Get the "Select All" checkbox by data-testid
  const selectAllCheckbox = component.getByTestId('select-all-checkbox');

  // Initially, the "Select All" checkbox should be unchecked
  expect(selectAllCheckbox.checked).toBe(false);

  // Check the "Select All" checkbox
  fireEvent.click(selectAllCheckbox);
  expect(selectAllCheckbox.checked).toBe(true);

  // Uncheck the "Select All" checkbox
  fireEvent.click(selectAllCheckbox);
  expect(selectAllCheckbox.checked).toBe(false);

});

test('Check and Uncheck Individual Checkboxes', () => {
  // Get the first checkbox by data-testid
  const checkbox = component.getByTestId('checkbox-0');

  // Initially, the checkbox should be unchecked
  expect(checkbox.checked).toBe(false);

  // Check the checkbox
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);

  // Uncheck the checkbox
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(false);
});

test('Delete a Specific User', async () => {
  const user = initialState.apps.allUsers[0]; // Get the user

  // Find the delete button and click it
  const deleteButton = component.getByTestId(`delete-icon-${user.id}`);
  fireEvent.click(deleteButton);

  // Verify that the deleteUser function was called with the correct user id
  const expectedActions = [
    {
      type: 'apps/setAllUsers', // Update this with your actual action type
      payload: initialState.apps.allUsers.filter(u => u.id !== user.id),
    },
  ];

  expect(mockstore.getActions()).toEqual(expectedActions);
});

test('Delete Selected Users By Checking Checkboxes', async () => {
  // Get the checkboxes by data-testid
  const checkbox1 = component.getByTestId('checkbox-0');
  const checkbox2 = component.getByTestId('checkbox-1');

  // Initially, the checkboxes should be unchecked
  expect(checkbox1.checked).toBe(false);
  expect(checkbox2.checked).toBe(false);

  // Check both checkboxes
  fireEvent.click(checkbox1);
  fireEvent.click(checkbox2);

  // Find the delete button and click it
  const deleteButton = component.getByTestId('delete-selected-users-button');
  fireEvent.click(deleteButton);

  // Verify that the deleteUser function was called with the correct user ids
  const expectedActions = [
    {
      type: 'apps/setAllUsers', // Update this with your actual action type
      payload: initialState.apps.allUsers.filter(
        user => user.id !== 1 && user.id !== 2
      ),
    },
  ];

  expect(mockstore.getActions()).toEqual(expectedActions);
})

afterEach(() => {
  component.unmount();
});
  
