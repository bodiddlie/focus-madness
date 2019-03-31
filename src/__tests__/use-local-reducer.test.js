import React from 'react';
import { render } from 'react-testing-library';

import { useLocalReducer } from '../use-local-reducer';

test('gets the state from local storage', () => {
  const spy = jest.spyOn(Storage.prototype, 'getItem');
  const setSpy = jest.spyOn(Storage.prototype, 'setItem');
  render(<Ui />);
  expect(spy).toHaveBeenCalledWith('KEY');
  expect(setSpy).toHaveBeenCalled();
});

const Ui = () => {
  useLocalReducer('KEY', jest.fn(), {});

  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};
