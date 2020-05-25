import { handle } from 'redux-pack';
import { FETCH_MY_FOLDER_LIST, CREATE_FOLDER, DELETE_FOLDER } from '../actions/folderActions';

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
    case DELETE_FOLDER:
    case CREATE_FOLDER:
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
          } else if (type === CREATE_FOLDER) {
            const id = data['folderId'];
            return {
              ...prevState,
              ...loadingAndErrorState,
              id,
              entities: { ...prevState.entities, [id]: data },
            };
          } else if (type === DELETE_FOLDER) {
            return initState;
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
