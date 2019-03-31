import parse from 'date-fns/parse';

import { reducer, initialState } from '../reducer';

test('returns given state by default', () => {
  const state = 'state';
  const action = { type: 'nogo' };
  const result = reducer(state, action);
  expect(result).toEqual(state);
});

test('does not blow up if no action give', () => {
  const state = 'state';
  const result = reducer(state);
  expect(result).toEqual(state);
});

test('returns default state if none given', () => {
  const result = reducer();
  expect(result).toEqual(initialState);
});

test('hydrate - populates state from given saved state', () => {
  const date = new Date();
  const state = {
    tasks: [1, 2, 3],
    appState: 'list',
    lastAsk: date.toISOString(),
    sorted: [{ id: 1 }, { id: 2 }],
  };
  const result = reducer(state, { type: 'hydrate', state });
  expect(result.tasks).toEqual(state.tasks);
  expect(result.sorted).toEqual(state.sorted);
  expect(result.appState).toEqual(state.appState);
  expect(result.lastAsk).toEqual(date);
});

describe('add', () => {
  test('if task of same name already exists, no task is added', () => {
    const state = {
      tasks: [{ title: 'test' }],
      appState: 'list',
    };
    const result = reducer(state, { type: 'add', task: { title: 'test' } });
    expect(result.tasks).toHaveLength(1);
  });

  test('can add a new task', () => {
    const state = {
      tasks: [{ title: 'test' }],
      appState: 'list',
    };
    const result = reducer(state, { type: 'add', task: { title: 'test 2' } });
    expect(result.tasks).toHaveLength(2);
  });
});

test('sort - sets the appState and the sorted, and clears tasks', () => {
  const date = new Date();
  const state = {
    tasks: [1, 2, 3],
    appState: 'list',
    lastAsk: date.toISOString(),
  };
  const result = reducer(state, { type: 'sort', sorted: [4, 5, 6] });
  expect(result.lastAsk).toEqual(state.lastAsk);
  expect(result.appState).toEqual('sorted');
  expect(result.tasks).toEqual([]);
  expect(result.sorted).toEqual([4, 5, 6]);
});

test('state - sets the appState', () => {
  const state = { appState: 'list', tasks: [1, 2, 3] };
  const result = reducer(state, { type: 'state', appState: 'sorted' });
  expect(result.tasks).toEqual([1, 2, 3]);
  expect(result.appState).toEqual('sorted');
});

describe('complete', () => {
  test('removes the completed item from sorted list', () => {
    const state = {
      tasks: [1, 2, 3],
      sorted: [{ title: 'test' }, { title: 'test 2' }],
      appState: 'sorted',
    };
    const result = reducer(state, {
      type: 'complete',
      task: { title: 'test' },
    });
    expect(result.sorted).toHaveLength(1);
    expect(result.appState).toEqual('sorted');
    expect(result.tasks).toEqual([1, 2, 3]);
  });

  test('if last item is removed from list sets appState to list', () => {
    const state = {
      tasks: [1, 2, 3],
      sorted: [{ title: 'test' }],
      appState: 'sorted',
    };
    const result = reducer(state, {
      type: 'complete',
      task: { title: 'test' },
    });
    expect(result.sorted).toHaveLength(0);
    expect(result.appState).toEqual('list');
    expect(result.tasks).toEqual([1, 2, 3]);
  });

  test('return given state if task is not in sorted list', () => {
    const state = {
      tasks: [1, 2, 3],
      sorted: [{ title: 'test' }],
      appState: 'sorted',
    };
    const result = reducer(state, {
      type: 'complete',
      task: { title: 'nogo' },
    });
    expect(result).toEqual(state);
  });
});

describe('add_bottom', () => {
  test('does not add a new task if the title already exists', () => {
    const state = {
      appState: 'test',
      sorted: [{ title: 'test' }],
    };
    const result = reducer(state, {
      type: 'add_bottom',
      task: { title: 'test' },
    });
    expect(result.appState).toEqual('test');
    expect(result.sorted).toHaveLength(1);
  });

  test('adds a new task to the bottom of the list', () => {
    const state = {
      appState: 'test',
      sorted: [{ title: 'test' }],
    };
    const result = reducer(state, {
      type: 'add_bottom',
      task: { title: 'test 2' },
    });
    expect(result.appState).toEqual('test');
    expect(result.sorted).toHaveLength(2);
    expect(result.sorted[1].title).toEqual('test 2');
  });
});

test('clear - resets to initial state and sets the lastAsk to now', () => {
  const state = 'state';
  const result = reducer(state, { type: 'clear' });
  expect(result.appState).toEqual(initialState.appState);
  expect(result.tasks).toEqual(initialState.tasks);
  expect(result.sorted).toEqual(initialState.sorted);
  expect(result.lastAsk).toBeDefined();
});

test('decline - sets the lastAsk', () => {
  const state = { appState: 'test' };
  const result = reducer(state, { type: 'decline' });
  expect(result.appState).toEqual('test');
  expect(result.lastAsk).toBeDefined();
});
