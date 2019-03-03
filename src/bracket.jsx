import React, { useState, useEffect, useContext } from 'react';

import { StateContext, DispatchContext } from './App';

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

export function Bracket() {
  const [remaining, setRemaining] = useState([]);
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [gold, setGold] = useState(null);
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    let remaining = [...state.tasks];
    if (state.tasks.length % 2 === 1) {
      let index = getRandomIndex(remaining);
      setWinners([...winners, remaining[index]]);
      remaining = [...remaining.slice(0, index), ...remaining.slice(index + 1)];
    }

    const [one, two, rem] = pickNext(remaining);
    setFirst(one);
    setSecond(two);
    setRemaining(rem);
  }, []);

  function pickNext(arr) {
    let a = [...arr];
    let index = getRandomIndex(a);
    let one = a[index];
    a = [...a.slice(0, index), ...a.slice(index + 1)];
    index = getRandomIndex(a);
    let two = a[index];
    a = [...a.slice(0, index), ...a.slice(index + 1)];
    return [one, two, a];
  }

  function pick(w, l) {
    if (remaining.length > 0) {
      setWinners([...winners, w]);
      setLosers([...losers, l]);
      const [one, two, rem] = pickNext(remaining);
      setFirst(one);
      setSecond(two);
      setRemaining(rem);
    } else {
      if (winners.length > 0) {
        const wins = [...winners, w];
        setLosers([...losers, l]);
        const [one, two, rem] = pickNext(wins);
        setFirst(one);
        setSecond(two);
        setWinners(rem);
      } else if (!gold && losers.length > 0) {
        setGold(w);
        const lose = [...losers, l];
        const [one, two, rem] = pickNext(lose);
        setFirst(one);
        setSecond(two);
        setLosers(rem);
      } else if (losers.length > 0) {
        const lose = [...losers, w];
        setSorted([...sorted, l]);
        const [one, two, rem] = pickNext(lose);
        setFirst(one);
        setSecond(two);
        setLosers(rem);
      } else {
        const s = !!gold
          ? [...sorted, l, w, gold].reverse()
          : [...sorted, l, w].reverse();
        setSorted(s);
        setFirst(null);
        setSecond(null);
        dispatch({ type: 'sort', sorted: s });
      }
    }
  }

  return (
    <div>
      <div>
        {!!first && !!second ? (
          <React.Fragment>
            <button onClick={() => pick(first, second)} type="button">
              {first.title}
            </button>
            <button onClick={() => pick(second, first)} type="button">
              {second.title}
            </button>
          </React.Fragment>
        ) : null}
      </div>
      Remaining
      <ul>
        {remaining.map(t => (
          <li key={t.title}>{t.title}</li>
        ))}
      </ul>
      Winners
      <ul>
        {winners.map(t => (
          <li key={t.title}>{t.title}</li>
        ))}
      </ul>
      Losers
      <ul>
        {losers.map(t => (
          <li key={t.title}>{t.title}</li>
        ))}
      </ul>
      Sorted
      <ul>
        {sorted.map(t => (
          <li key={t.title}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
