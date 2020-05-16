import {
  SET_MY_PROBLEM_LIST,
  SET_MY_ANSWER,
  SET_IS_CONFUSED,
  SET_MY_SOLUTION,
} from '../actions/myProblemActions';

const initState = {
  ids: [],
  entities: {},
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MY_PROBLEM_LIST: {
      const ids = payload.map(entity => entity['myProblemId']);
      const entities = payload.reduce(
        (finalEntities, entity) => ({
          ...finalEntities,
          [entity['myProblemId']]: entity,
        }),
        {},
      );
      return { ...state, ids, entities };
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
    default:
      return state;
  }
};
