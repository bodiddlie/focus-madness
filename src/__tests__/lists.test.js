import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { Lists } from '../lists';
import { Ui } from '../test-utils';

test('start button is disabled if there are no tasks', () => {
  const state = { tasks: [] };
  const { getByText } = render(
    <Ui state={state}>
      <Lists />
    </Ui>
  );
  expect(getByText(/Start Bracket/i)).toBeDisabled();
});

test('add button is disabled if text is empty', () => {
  const state = { tasks: [] };
  const { getByTestId } = render(
    <Ui state={state}>
      <Lists />
    </Ui>
  );
  expect(getByTestId(/add-button/i)).toBeDisabled();
});

test('clicking the add button adds an item to the list and enables the start button', () => {
  const state = { tasks: [] };
  const dispatch = jest.fn(() => state.tasks.push({}));
  const { getByTestId, getByLabelText, getByText } = render(
    <Ui dispatch={dispatch} state={state}>
      <Lists />
    </Ui>
  );
  const input = getByLabelText(/task title/i);
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.click(getByTestId(/add-button/i));
  expect(getByText(/Start Bracket/i)).toBeEnabled();
  expect(dispatch).toHaveBeenCalledWith({
    type: 'add',
    task: { title: 'test', done: false },
  });
});

test('clicking the start button dispatches the bracket state', () => {
  const state = { tasks: [{}] };
  const dispatch = jest.fn();
  const { getByText } = render(
    <Ui dispatch={dispatch} state={state}>
      <Lists />
    </Ui>
  );
  const button = getByText(/Start Bracket/);
  fireEvent.click(button);
  expect(dispatch).toHaveBeenCalledWith({
    type: 'state',
    appState: 'bracket',
  });
});
