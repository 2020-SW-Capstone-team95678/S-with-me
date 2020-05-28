import { VIEW_WRONG_ONLY } from '../actions/filterActions';

const initState = {
  entities: {},
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case VIEW_WRONG_ONLY: {
      const { isViewWrongOnly } = payload;
      return { ...state, entities: { viewWrongOnly: isViewWrongOnly } };
    }
    default:
      return state;
  }
};
