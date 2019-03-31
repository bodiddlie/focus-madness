import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';

import { StateContext, DispatchContext } from './App';

export function Todo() {
  const [title, setTitle] = useState('');
  const [added, setAdded] = useState(null);
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const first = state.sorted[0];

  function complete() {
    dispatch({ type: 'complete', task: first });
  }

  function handleChange({ target }) {
    setTitle(target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const task = { title, done: false };
    dispatch({ type: 'add_bottom', task });
    setAdded(title);
    setTitle('');
  }

  return (
    <Container>
      <h1>Task:</h1>
      <h2>{first.title}</h2>
      <Buttons>
        <First onClick={complete}>Complete</First>
      </Buttons>
      <Bottom>
        {!!added ? <Toast>Added "{added}" to bottom of list.</Toast> : null}
        <Form onSubmit={handleSubmit}>
          <label htmlFor="title">Task Title</label>
          <TextBox
            id="title"
            name="title"
            onChange={handleChange}
            value={title}
          />
          <AddButton data-testid="add-button">
            <Plus>
              <path d="M25 5 L25 45 M5 25 L45 25" />
            </Plus>
          </AddButton>
        </Form>
      </Bottom>
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
    margin-top: 0.5rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Button = styled.button.attrs({
  type: 'button',
})`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.75rem;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  border: none;
  width: 33%;
`;

const First = styled(Button)`
  background-color: #ecbe13;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  width: 100%;

  & > * + * {
    margin-top: 0.5rem;
  }
`;

const Toast = styled.div`
  background-color: hsla(68, 59%, 40%, 0.5);
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  width: 75%;
  padding: 0.75rem;
  border-radius: 20px;
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
  placeholder: 'Add todo to bottom of list',
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
