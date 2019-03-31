import React from 'react';

import { StateContext, DispatchContext } from './App';

export const Ui = ({ state, dispatch, children }) => (
  <StateContext.Provider value={state}>
    <DispatchContext.Provider value={dispatch}>
      {children}
    </DispatchContext.Provider>
  </StateContext.Provider>
);
