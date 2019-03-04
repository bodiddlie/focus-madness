import React, { createContext } from 'react';
import dateDiff from 'date-fns/difference_in_days';

import { Clear } from './clear';
import { Lists } from './lists';
import { Bracket } from './bracket';
import { Todo } from './todo';
import { useLocalReducer } from './use-local-reducer';
import { initialState, reducer } from './reducer';

const STATE_KEY = 'focus-madness-2019-state-key';

export const StateContext = createContext(initialState);
export const DispatchContext = createContext(null);

function App(props) {
  const [state, dispatch] = useLocalReducer(STATE_KEY, reducer, initialState);

  const askToClear =
    !!state.lastAsk &&
    dateDiff(Date.now(), state.lastAsk) >= 1 &&
    (state.tasks.length > 0 || state.sorted.length > 0);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {askToClear ? (
          <Clear />
        ) : (
          <React.Fragment>
            {state.appState === 'list' && <Lists />}
            {state.appState === 'bracket' && <Bracket />}
            {state.appState === 'sorted' && <Todo />}
          </React.Fragment>
        )}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
