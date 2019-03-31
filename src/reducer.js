import parse from 'date-fns/parse';

export const initialState = {
  tasks: [],
  sorted: [],
  appState: 'list',
  lastAsk: Date.now(),
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'hydrate': {
      const lastAsk = parse(action.state.lastAsk);
      const { appState, tasks, sorted } = action.state;
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
