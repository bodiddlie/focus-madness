import React from 'react';
import { render, fireEvent, act } from 'react-testing-library';

import { Bracket } from '../bracket';
import { Ui } from '../test-utils';

test('renders nothing if no items to render', () => {
  const state = { tasks: [] };
  const { queryByText } = render(
    <Ui state={state}>
      <Bracket />
    </Ui>
  );
  expect(queryByText(/vs/i)).toBeNull();
});

test('renders nothing if only one item is given', () => {
  const state = { tasks: [{ title: 'test' }] };
  const { queryByText } = render(
    <Ui state={state}>
      <Bracket />
    </Ui>
  );
  expect(queryByText(/vs/i)).toBeNull();
});

test('renders two options to pick if two are given', () => {
  const state = { tasks: [{ title: 'one' }, { title: 'two' }] };
  const { queryByText } = render(
    <Ui state={state}>
      <Bracket />
    </Ui>
  );
  expect(queryByText(/vs/i)).not.toBeNull();
});

test('given two options, picking the first returns a sorted array', () => {
  const state = { tasks: [{ title: 'two' }, { title: 'one' }] };
  const dispatch = jest.fn();
  const { getByText } = render(
    <Ui state={state} dispatch={dispatch}>
      <Bracket />
    </Ui>
  );
  act(() => {
    fireEvent.click(getByText(/one/i));
  });
  expect(dispatch).toHaveBeenCalledWith({
    type: 'sort',
    sorted: [{ title: 'one' }, { title: 'two' }],
  });
});

test('given three options, can pick out a sorted order', () => {
  const state = {
    tasks: [{ title: 'two' }, { title: 'one' }, { title: 'three' }],
  };
  const dispatch = jest.fn();
  const { getByTestId, getByText } = render(
    <Ui state={state} dispatch={dispatch}>
      <Bracket />
    </Ui>
  );
  const first = getByTestId(/first/i);
  const second = getByTestId(/second/i);
  const goldText = first.textContent;
  const losingText = second.textContent;
  act(() => {
    fireEvent.click(first);
  });
  const gold = getByText(goldText);
  const silverId = gold.dataset['testid'] === 'first' ? 'second' : 'first';
  const silverText = getByTestId(silverId).textContent;
  act(() => {
    fireEvent.click(gold);
  });
  const silver = getByText(silverText);
  act(() => {
    fireEvent.click(silver);
  });
  expect(dispatch).toHaveBeenCalledWith({
    type: 'sort',
    sorted: [{ title: goldText }, { title: silverText }, { title: losingText }],
  });
});

test('given more than three options, can pick out a sorted order', () => {
  const state = {
    tasks: [
      { title: 'two' },
      { title: 'four' },
      { title: 'one' },
      { title: 'three' },
    ],
  };
  const dispatch = jest.fn();
  const { getByTestId, getByText } = render(
    <Ui state={state} dispatch={dispatch}>
      <Bracket />
    </Ui>
  );
  let first = getByTestId(/first/i);
  const goldText = first.textContent;
  act(() => {
    fireEvent.click(first);
  });
  first = getByTestId(/first/i);
  act(() => {
    fireEvent.click(first);
  });
  act(() => {
    fireEvent.click(getByText(goldText));
  });
  first = getByTestId(/first/i);
  let second = getByTestId(/second/i);
  const losingText = second.textContent;
  act(() => {
    fireEvent.click(first);
  });
  first = getByTestId(/first/i);
  second = getByTestId(/second/i);
  const silverText = first.textContent;
  const bronzeText = second.textContent;
  act(() => {
    fireEvent.click(first);
  });
  expect(dispatch).toHaveBeenCalledWith({
    type: 'sort',
    sorted: [
      { title: goldText },
      { title: silverText },
      { title: bronzeText },
      { title: losingText },
    ],
  });
});
