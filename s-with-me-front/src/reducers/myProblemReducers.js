import {
  SET_MY_ANSWER,
  SET_IS_CONFUSED,
  SET_MY_SOLUTION,
  SET_SOLVED_DATETIME,
  SET_IS_RIGHT,
} from '../actions/myProblemActions';

import { FETCH_MY_PROBLEM_LIST } from '../actions/myProblemPackActions';
import { handle } from 'redux-pack';

const initState = {
  ids: [],
  entities: {},
  loading: false,
  hasError: false,
  pagination: {},
};

export default (state = initState, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case FETCH_MY_PROBLEM_LIST: {
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: true,
          hasError: false,
        }),
        success: prevState => {
          const { data } = payload;
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
            ids,
            entities,
            loading: false,
            hasError: false,
            pagination: { number: pageNumber, size: pageSize },
          };
        },
        failure: prevState => {
          const { errorMessage } = payload.response.data;
          return { ...prevState, loading: false, hasError: true, errorMessage };
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
