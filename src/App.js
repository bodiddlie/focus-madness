import React, { useReducer, useEffect, createContext } from 'react';

import { Clear } from './clear';
import { Lists } from './lists';
import { Bracket } from './bracket';
import { Todo } from './todo';
import parse from 'date-fns/parse';
import dateDiff from 'date-fns/difference_in_days';

const STATE_KEY = 'focus-madness-2019-state-key';

const initialState = {
  tasks: [],
  sorted: [],
  appState: 'list',
  lastAsk: Date.now(),
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate': {
      const lastAsk = parse(action.state.lastAsk);
      const { appState, tasks } = action.state;
      const sorted = action.state.sorted.map(s => ({
        ...s,
        startDate: !!s.startDate ? parse(s.startDate) : null,
      }));
      const newState = { lastAsk, appState, tasks, sorted };
      return newState;
    }
    case 'add': {
      if (state.tasks.find(t => t.title === action.task.title)) {
        return state;
      } else {
        return { ...state, tasks: [...state.tasks, action.task] };
      }
    }
    case 'sort': {
      return { ...state, tasks: [], sorted: action.sorted, appState: 'sorted' };
    }
    case 'state': {
      return { ...state, appState: action.appState };
    }
    case 'complete': {
      const filtered = state.sorted.filter(s => s.title !== action.task.title);
      const newState = {
        ...state,
        sorted: filtered,
        appState: filtered.length === 0 ? 'list' : state.appState,
      };
      return newState;
    }
    case 'start': {
      const started = state.sorted.map(s => {
        if (s.title === action.task.title) {
          s.startDate = Date.now();
        }
        return s;
      });
      return { ...state, sorted: started };
    }
    case 'add_bottom': {
      if (state.sorted.find(t => t.title === action.task.title)) {
        return state;
      } else {
        return { ...state, sorted: [...state.sorted, action.task] };
      }
    }
    case 'clear': {
      return { ...initialState, lastAsk: Date.now() };
    }
    case 'decline': {
      return { ...state, lastAsk: Date.now() };
    }
    default: {
      return state;
    }
  }
}

function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STATE_KEY)) || initialState;
    dispatch({ type: 'hydrate', state: stored });
  }, []);

  useEffect(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }, [state]);

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
