import { handle } from 'redux-pack';
import { FETCH_PUBLISHER_INVENTORY } from '../actions/inventoryActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_PUBLISHER_INVENTORY]: false,
  },
  errorState: {
    [FETCH_PUBLISHER_INVENTORY]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PUBLISHER_INVENTORY: {
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

          const ids = data.map(entity => entity['bookId']);
          const entities = data.reduce(
            (finalEntities, entity) => ({
              ...finalEntities,
              [entity['bookId']]: entity,
            }),
            {},
          );
          return {
            ...prevState,
            ...loadingAndErrorState,
            ids,
            entities: { ...prevState.entities, ...entities },
          };
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
    default:
      return state;
  }
};
