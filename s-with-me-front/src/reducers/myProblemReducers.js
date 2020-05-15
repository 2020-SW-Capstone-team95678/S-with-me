import { SET_MY_PROBLEM_LIST } from '../actions/myProblemActions';

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
    default:
      return state;
  }
};
