import React from 'react';
import { render, fireEvent, act } from 'react-testing-library';

import { Todo } from '../todo';
import { Ui } from '../test-utils';

test('can complete the first task in the queue', () => {
  const state = { sorted: [{ title: 'test' }] };
  const dispatch = jest.fn();
  const { getByText } = render(
    <Ui state={state} dispatch={dispatch}>
      <Todo />
    </Ui>
  );
  act(() => {
    fireEvent.click(getByText(/complete/i));
  });
  expect(dispatch).toHaveBeenCalledWith({
    type: 'complete',
    task: state.sorted[0],
  });
});

test('can add task to the bottom of the list', () => {
  const state = { sorted: [{ title: 'test' }] };
  const dispatch = jest.fn();
  const { getByLabelText, getByTestId } = render(
    <Ui state={state} dispatch={dispatch}>
      <Todo />
    </Ui>
  );
  act(() => {
    fireEvent.change(getByLabelText(/task title/i), {
      target: { value: 'added' },
    });
  });
  act(() => {
    fireEvent.click(getByTestId(/add-button/i));
  });

  expect(dispatch).toHaveBeenCalledWith({
    type: 'add_bottom',
    task: { title: 'added', done: false },
  });
  expect(getByLabelText(/task title/i).value).toEqual('');
});
