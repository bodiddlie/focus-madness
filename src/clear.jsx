import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import { DispatchContext } from './App';

export function Clear() {
  const dispatch = useContext(DispatchContext);

  function yesClick() {
    dispatch({ type: 'clear' });
  }

  function noClick() {
    dispatch({ type: 'decline' });
  }

  return (
    <Container>
      <Text>It's a new day! Shall we clear your list and start a new one?</Text>
      <YesButton onClick={yesClick}>Yes</YesButton>
      <NoButton onClick={noClick}>No</NoButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5em;

  & > * + * {
    margin-top: 1.5em;
  }
`;

const Text = styled.p`
  margin: 0;
  color: #fff;
  text-align: center;
  font-size: 2em;
`;

const YesButton = styled.button.attrs({
  type: 'button',
})`
  background-color: #ecbe13;
  color: #fff;
  font-size: 1.5em;
  font-weight: bold;
  width: 75%;
  padding: 0.75em;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  border: none;
`;

const NoButton = styled.button.attrs({
  type: 'button',
})`
  background-color: #93a42a;
  color: #fff;
  font-size: 1.5em;
  font-weight: bold;
  width: 75%;
  padding: 0.75em;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  border: none;
`;
