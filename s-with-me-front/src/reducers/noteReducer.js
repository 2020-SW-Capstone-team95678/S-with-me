import { handle } from 'redux-pack';
import {
  FETCH_NOTE_LIST,
  DELETE_NOTE,
  SET_RESOLVE,
  SET_MY_NEW_ANSWER,
  SET_MY_NEW_SOLUTION,
  SET_NEW_IS_RIGHT,
  SET_NEW_SOLVED_DATE_TIME,
} from '../actions/noteActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_NOTE_LIST]: false,
    [DELETE_NOTE]: false,
  },
  errorState: {
    [FETCH_NOTE_LIST]: false,
    [DELETE_NOTE]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_NOTE:
    case FETCH_NOTE_LIST: {
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loadingState: { ...prevState.loadingState, [type]: true },
          errorState: { ...prevState.errorState, [type]: false },
        }),
        success: prevState => {
          const { data } = payload;
          const loadingAndErrorState = {
            loadingState: { ...prevState.loadingState, [type]: false },
            errorState: { ...prevState.errorState, [type]: false },
          };
          if (type === FETCH_NOTE_LIST) {
            const ids = data.map(entity => entity['noteId']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['noteId']]: entity,
              }),
              {},
            );
            return {
              ...prevState,
              ...loadingAndErrorState,
              ids,
              entities: { ...prevState.entities, ...entities },
            };
          } else {
            return {
              ...prevState,
              ...loadingAndErrorState,
            };
          }
        },
        failure: prevState => {
          const { message } = payload.response.data;
          return {
            ...prevState,
            loadingState: { ...prevState.loadingState, [type]: false },
            errorState: { ...prevState.errorState, [type]: message || true },
          };
        },
      });
    }
    case SET_RESOLVE: {
      const { id, resolve } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], resolve },
        },
      };
    }
    case SET_MY_NEW_ANSWER: {
      const { id, myAnswer } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], myAnswer },
        },
      };
    }
    case SET_MY_NEW_SOLUTION: {
      const { id, myNewSolution } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], myNewSolution },
        },
      };
    }
    case SET_NEW_IS_RIGHT: {
      const { id, isRight } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], isRight },
        },
      };
    }
    case SET_NEW_SOLVED_DATE_TIME: {
      const { id, solvedDateTime } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], solvedDateTime },
        },
      };
    }
    default:
      return state;
  }
};
