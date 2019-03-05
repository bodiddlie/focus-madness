import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';

import { StateContext, DispatchContext } from './App';

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

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
      setWinners([remaining[index]]);
      remaining = [...remaining.slice(0, index), ...remaining.slice(index + 1)];
    }

    const [one, two, rem] = pickNext(remaining);
    setFirst(one);
    setSecond(two);
    setRemaining(rem);
  }, [state.tasks]);

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
    <Container>
      <Heading>Pick a Winner</Heading>
      {!!first && !!second ? (
        <ChoiceWrapper>
          <First onClick={() => pick(first, second)}>{first.title}</First>
          <VS>vs</VS>
          <Second onClick={() => pick(second, first)}>{second.title}</Second>
        </ChoiceWrapper>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  width: 100%;
  height: calc(${props => window.innerHeight * 0.01}px * 100);

  & > * + * {
    margin-top: 1.5rem;
  }
`;

const Heading = styled.h1`
  color: #fff;
`;

const ChoiceWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Button = styled.button.attrs({
  type: 'button',
})`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  width: 75%;
  padding: 0.75em;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  border: none;
  flex: 1;
`;

const First = styled(Button)`
  background-color: #ecbe13;
`;

const Second = styled(Button)`
  background-color: hsl(68, 59%, 40%);
`;

const VS = styled.h2`
  color: #fff;
`;
