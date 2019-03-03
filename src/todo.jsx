import React, { useState, useEffect, useContext } from 'react';

import { StateContext, DispatchContext } from './App';

export function Todo() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(0);
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const first = state.sorted[0];

  function complete() {
    dispatch({ type: 'complete', task: first });
  }

  function start() {
    dispatch({ type: 'start', task: first });
  }

  function handleChange({ target }) {
    setTitle(target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const task = { title, done: false };
    dispatch({ type: 'add_bottom', task });
    setTitle('');
  }

  useEffect(() => {
    const timer = setInterval(() =>
      setTime(!!first.startDate ? Date.now() - first.startDate : 0)
    );
    return () => clearInterval(timer);
  });

  return (
    <div>
      <button type="button" onClick={complete}>
        {first.title}
      </button>
      {!!first.startDate ? (
        <div>{time}</div>
      ) : (
        <button type="button" onClick={start}>
          Start
        </button>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} value={title} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
