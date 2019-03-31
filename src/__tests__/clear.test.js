import React from 'react';
import { render, fireEvent, act } from 'react-testing-library';

import { Clear } from '../clear';
import { Ui } from '../test-utils';

test('clicking yes button dispatches a clear event', () => {
  const dispatch = jest.fn();
  const { getByText } = render(
    <Ui dispatch={dispatch}>
      <Clear />
    </Ui>
  );
  act(() => {
    fireEvent.click(getByText(/yes/i));
  });
  expect(dispatch).toHaveBeenCalledWith({ type: 'clear' });
});

test('clicking no button dispatches a decline event', () => {
  const dispatch = jest.fn();
  const { getByText } = render(
    <Ui dispatch={dispatch}>
      <Clear />
    </Ui>
  );
  act(() => {
    fireEvent.click(getByText(/no/i));
  });
  expect(dispatch).toHaveBeenCalledWith({ type: 'decline' });
});
