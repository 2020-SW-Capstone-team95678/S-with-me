import { handle } from 'redux-pack';
import { FETCH_PUBLISHER_INVENTORY, UPDATE_PUBLISHER_BOOK } from '../actions/inventoryActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_PUBLISHER_INVENTORY]: false,
    [UPDATE_PUBLISHER_BOOK]: false,
  },
  errorState: {
    [FETCH_PUBLISHER_INVENTORY]: false,
    [UPDATE_PUBLISHER_BOOK]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PUBLISHER_BOOK:
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
          if (type === FETCH_PUBLISHER_INVENTORY) {
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
          } else {
            const id = data['bookId'];
            return {
              ...prevState,
              ...loadingAndErrorState,
              id,
              entities: { ...prevState.entities, [id]: data },
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
    default:
      return state;
  }
};
