import parse from 'date-fns/parse';

export const initialState = {
  tasks: [],
  sorted: [],
  appState: 'list',
  lastAsk: Date.now(),
};

export function reducer(state, action) {
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
