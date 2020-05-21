import { SET_LAST_MY_PROBLEM } from '../actions/myBookActions';

import { handle } from 'redux-pack';
import { FETCH_MY_BOOK_LIST } from '../actions/myBookPackActions';

const initState = {
  ids: [],
  entities: {},
  loading: false,
  hasError: false,
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_MY_BOOK_LIST: {
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          loading: true,
          hasError: false,
        }),
        success: (prevState) => {
          const { data } = payload;
          const ids = data.map((entity) => entity['myBookId']);
          const entities = data.reduce(
            (finalEntities, entity) => ({
              ...finalEntities,
              [entity['myBookId']]: entity,
            }),
            {},
          );
          return { ...prevState, ids, entities, loading: false, hasError: false };
        },
        failure: (prevState) => {
          const { errorMessage } = payload.response.data;
          return {
            ...prevState,
            loading: false,
            hasError: true,
            errorMessage,
          };
        },
      });
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
