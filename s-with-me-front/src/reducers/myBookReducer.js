import { SET_LAST_MY_PROBLEM_ID } from '../actions/myBookActions';

import { handle } from 'redux-pack';
import { FETCH_MY_BOOK_LIST, UPDATE_LAST_PROBLEM_ID } from '../actions/myBookPackActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_MY_BOOK_LIST]: false,
    [UPDATE_LAST_PROBLEM_ID]: false,
  },
  errorState: {
    [FETCH_MY_BOOK_LIST]: false,
    [UPDATE_LAST_PROBLEM_ID]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_LAST_PROBLEM_ID:
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
          if (type === FETCH_MY_BOOK_LIST) {
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
          const { errorMessage } = payload.response.data;
          return {
            ...prevState,
            loadingState: { ...prevState.loadingState, [type]: false },
            errorState: { ...prevState.errorState, [type]: errorMessage || true },
          };
        },
      });
    }
    case SET_LAST_MY_PROBLEM_ID: {
      const { id, lastProblemId } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], lastProblemId },
        },
      };
    }
    default:
      return state;
  }
};
