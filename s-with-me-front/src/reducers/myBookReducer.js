import { SET_LAST_MY_PROBLEM_PAGE } from '../actions/myBookActions';

import { handle } from 'redux-pack';
import {
  FETCH_MY_BOOK_LIST,
  UPDATE_MY_BOOK,
  MOVE_MY_BOOK,
  FETCH_FILTERED_MY_BOOK_LIST,
} from '../actions/myBookPackActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_MY_BOOK_LIST]: false,
    [FETCH_FILTERED_MY_BOOK_LIST]: false,
    [UPDATE_MY_BOOK]: false,
    [MOVE_MY_BOOK]: false,
  },
  errorState: {
    [FETCH_MY_BOOK_LIST]: false,
    [FETCH_FILTERED_MY_BOOK_LIST]: false,
    [UPDATE_MY_BOOK]: false,
    [MOVE_MY_BOOK]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_FILTERED_MY_BOOK_LIST:
    case MOVE_MY_BOOK:
    case UPDATE_MY_BOOK:
    case FETCH_MY_BOOK_LIST: {
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
          if (type === FETCH_MY_BOOK_LIST || type === FETCH_FILTERED_MY_BOOK_LIST) {
            const ids = data.map(entity => entity['myBookId']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['myBookId']]: entity,
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
    case SET_LAST_MY_PROBLEM_PAGE: {
      const { id, lastPageNumber } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], lastPageNumber },
        },
      };
    }
    default:
      return state;
  }
};
