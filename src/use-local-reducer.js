import { useReducer, useEffect } from 'react';

export function useLocalReducer(storageKey, reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey)) || initialState;
    dispatch({ type: 'hydrate', state: stored });
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
}
