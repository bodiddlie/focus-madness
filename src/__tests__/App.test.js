import React from 'react';
import { render } from 'react-testing-library';

import App, { STATE_KEY } from '../App';
import { initialState } from '../reducer';

test('renders the clear screen if past a day since last ask and there are tasks', () => {
  const state = { ...initialState, lastAsk: new Date(2018, 1, 1), tasks: [{}] };
  const spy = jest.spyOn(Storage.prototype, 'getItem');
  spy.mockImplementationOnce(() => JSON.stringify(state));
  const { getByText } = render(<App />);
  expect(getByText(/yes/i)).not.toBeNull();
  expect(spy).toHaveBeenCalledWith(STATE_KEY);
});

test('renders the clear screen if past a day since last ask and there are sorted tasks', () => {
  const state = {
    ...initialState,
    lastAsk: new Date(2018, 1, 1),
    sorted: [{}],
  };
  const spy = jest.spyOn(Storage.prototype, 'getItem');
  spy.mockImplementationOnce(() => JSON.stringify(state));
  const { getByText } = render(<App />);
  expect(getByText(/yes/i)).not.toBeNull();
  expect(spy).toHaveBeenCalledWith(STATE_KEY);
});

test('renders the bracket screen if the state is set to bracket', () => {
  const state = {
    ...initialState,
    appState: 'bracket',
    tasks: [{ title: 'one' }, { title: 'two' }],
  };
  const spy = jest.spyOn(Storage.prototype, 'getItem');
  spy.mockImplementationOnce(() => JSON.stringify(state));
  const { getByText } = render(<App />);
  expect(getByText(/one/i)).not.toBeNull();
  expect(spy).toHaveBeenCalledWith(STATE_KEY);
});

test('renders the todo screen if the state is set to todo', () => {
  const state = {
    ...initialState,
    appState: 'sorted',
    sorted: [{ title: 'one' }, { title: 'two' }, { title: 'three' }],
  };
  const spy = jest.spyOn(Storage.prototype, 'getItem');
  spy.mockImplementationOnce(() => JSON.stringify(state));
  const { getByText } = render(<App />);
  expect(getByText(/complete/i)).not.toBeNull();
  expect(spy).toHaveBeenCalledWith(STATE_KEY);
});
