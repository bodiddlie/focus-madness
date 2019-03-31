import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';

import { StateContext, DispatchContext } from './App';

export function Lists(props) {
  const [title, setTitle] = useState('');
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  function handleChange({ target }) {
    setTitle(target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const task = { title, done: false };
    dispatch({ type: 'add', task });
    setTitle('');
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="title">Task Title</label>
        <TextBox
          id="title"
          name="title"
          onChange={handleChange}
          value={title}
        />
        <AddButton data-testid="add-button" disabled={title.length === 0}>
          <Plus>
            <path d="M25 5 L25 45 M5 25 L45 25" />
          </Plus>
        </AddButton>
      </Form>
      <StartButton
        onClick={() => dispatch({ type: 'state', appState: 'bracket' })}
        disabled={state.tasks.length === 0}
      >
        Start Bracket
      </StartButton>
      {state.tasks.length > 0 && (
        <Toast>
          Added "{state.tasks[state.tasks.length - 1].title}" to bracket.
        </Toast>
      )}
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
    margin-top: 1.5em;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  background: #fff;
  padding: 0.25rem;
  border-radius: 10px;
`;

const TextBox = styled.input.attrs({
  type: 'text',
  placeholder: 'Enter todo name',
})`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: #046d8b;
`;

const AddButton = styled.button.attrs({
  type: 'submit',
})`
  background: transparent;
  border: none;
  outline: none;
`;

const Plus = styled.svg`
  height: 50px;
  width: 50px;
  stroke: #2fb8ac;
  stroke-width: 5px;
`;

const StartButton = styled.button.attrs({
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

const Toast = styled.div`
  background-color: hsla(68, 59%, 40%, 0.5);
  color: #fff;
  font-size: 1.5em;
  font-weight: bold;
  width: 75%;
  padding: 0.75em;
  border-radius: 20px;
  margin-top: auto;
`;
