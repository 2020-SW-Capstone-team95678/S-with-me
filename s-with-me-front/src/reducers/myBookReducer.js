import {
  LOADING_MY_BOOK_LIST,
  SET_ERROR,
  SET_MY_BOOK_LIST,
  SET_LAST_MY_PROBLEM,
} from '../actions/myBookActions';

const initState = {
  ids: [],
  entities: {},
  loading: false,
  hasError: false,
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR: {
      const { errorMessage } = payload;
      return {
        ...state,
        loading: false,
        hasError: true,
        errorMessage,
      };
    }
    case LOADING_MY_BOOK_LIST: {
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    }
    case SET_MY_BOOK_LIST: {
      const ids = payload.map((entity) => entity['myBookId']);
      const entities = payload.reduce(
        (finalEntities, entity) => ({
          ...finalEntities,
          [entity['myBookId']]: entity,
        }),
        {},
      );
      return { ...state, ids, entities, loading: false, hasError: false };
    }
    case SET_LAST_MY_PROBLEM: {
      const { id, lastMyProblemId } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], lastMyProblemId },
        },
      };
    }
    default:
      return state;
  }
};
