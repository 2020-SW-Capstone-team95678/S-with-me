import { handle } from 'redux-pack';
import { FETCH_MY_FOLDER_LIST } from '../actions/folderActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_MY_FOLDER_LIST]: false,
  },
  errorState: {
    [FETCH_MY_FOLDER_LIST]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_MY_FOLDER_LIST: {
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
          if (type === FETCH_MY_FOLDER_LIST) {
            const ids = data.map(entity => entity['folderId']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['folderId']]: entity,
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
    default:
      return state;
  }
};
