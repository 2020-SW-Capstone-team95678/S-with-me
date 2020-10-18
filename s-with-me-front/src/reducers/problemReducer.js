import { handle } from 'redux-pack';
import {
  FETCH_PROBLEM_LIST,
  CREATE_PROBLEM,
  UPDATE_PROBLEM,
  DELETE_PROBLEM,
} from '../actions/problemAction';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_PROBLEM_LIST]: false,
    [CREATE_PROBLEM]: false,
    [UPDATE_PROBLEM]: false,
    [DELETE_PROBLEM]: false,
  },
  errorState: {
    [FETCH_PROBLEM_LIST]: false,
    [CREATE_PROBLEM]: false,
    [UPDATE_PROBLEM]: false,
    [DELETE_PROBLEM]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROBLEM:
    case CREATE_PROBLEM:
    case FETCH_PROBLEM_LIST: {
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
          if (type === FETCH_PROBLEM_LIST) {
            const ids = data.map(entity => entity['problemId']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['problemId']]: entity,
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
    case DELETE_PROBLEM:
      return initState;
    default:
      return state;
  }
};
