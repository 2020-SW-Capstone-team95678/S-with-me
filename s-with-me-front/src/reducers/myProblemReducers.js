import {
  SET_MY_PROBLEM_LIST,
  SET_MY_ANSWER,
  SET_IS_CONFUSED,
  SET_MY_SOLUTION,
  SET_SOLVED_DATETIME,
  SET_IS_RIGHT,
  LOADING_MY_PROBLEM_LIST,
} from '../actions/myProblemActions';

const initState = {
  ids: [],
  entities: {},
  loading: false,
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_MY_PROBLEM_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_MY_PROBLEM_LIST: {
      const ids = payload.map(entity => entity['myProblemId']);
      const entities = payload.reduce(
        (finalEntities, entity) => ({
          ...finalEntities,
          [entity['myProblemId']]: entity,
        }),
        {},
      );
      return { ...state, ids, entities, loading: false };
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
      const { id, isConfused } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], isConfused },
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
      const { id, isRight } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], isRight },
        },
      };
    }
    default:
      return state;
  }
};
