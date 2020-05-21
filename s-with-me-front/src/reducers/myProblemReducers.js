import {
  SET_MY_ANSWER,
  SET_IS_CONFUSED,
  SET_MY_SOLUTION,
  SET_SOLVED_DATETIME,
  SET_IS_RIGHT,
} from '../actions/myProblemActions';

import { FETCH_MY_PROBLEM_LIST, UPDATE_MY_PROBLEM } from '../actions/myProblemPackActions';
import { handle } from 'redux-pack';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_MY_PROBLEM_LIST]: false,
    [UPDATE_MY_PROBLEM]: false,
  },
  errorState: {
    [FETCH_MY_PROBLEM_LIST]: false,
    [UPDATE_MY_PROBLEM]: false,
  },
  pagination: {},
  pages: {},
};

export default (state = initState, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case UPDATE_MY_PROBLEM:
    case FETCH_MY_PROBLEM_LIST: {
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loadingState: { ...prevState.loadingState, [type]: true },
          errorState: { ...prevState.errorState, [type]: false },
        }),
        success: prevState => {
          const { data } = payload;
          const loadingAndErrorState = {
            loadingState: { ...prevState, [type]: false },
            errorState: { ...prevState, [type]: false },
          };
          if (type === FETCH_MY_PROBLEM_LIST) {
            const { pageNumber, pageSize } = meta || {};
            const ids = data.map(entity => entity['myProblemId']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['myProblemId']]: entity,
              }),
              {},
            );
            return {
              ...prevState,
              ...loadingAndErrorState,
              ids,
              entities: { ...prevState.entities, ...entities },
              pagination: { number: pageNumber, size: pageSize },
              pages: { ...prevState.pages, [pageNumber]: ids },
            };
          } else {
            const id = data['myProblemId'];
            return {
              ...prevState,
              ...loadingAndErrorState,
              id,
              entities: { ...prevState.entities, [id]: data },
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
    case SET_MY_ANSWER: {
      const { id, myAnswer } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], myAnswer },
        },
      };
    }
    case SET_IS_CONFUSED: {
      const { id, confused } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], confused },
        },
      };
    }
    case SET_MY_SOLUTION: {
      const { id, mySolution } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], mySolution },
        },
      };
    }
    case SET_SOLVED_DATETIME: {
      const { id, solvedDateTime } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], solvedDateTime },
        },
      };
    }
    case SET_IS_RIGHT: {
      const { id, right } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], right },
        },
      };
    }
    default:
      return state;
  }
};
