import { handle } from 'redux-pack';
import {
  FETCH_MY_FOLDER_LIST,
  CREATE_FOLDER,
  DELETE_FOLDER,
  UPDATE_FOLDER_NAME,
} from '../actions/folderActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_MY_FOLDER_LIST]: false,
    [CREATE_FOLDER]: false,
    [UPDATE_FOLDER_NAME]: false,
  },
  errorState: {
    [FETCH_MY_FOLDER_LIST]: false,
    [CREATE_FOLDER]: false,
    [UPDATE_FOLDER_NAME]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_FOLDER_NAME:
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
          } else {
            const id = data['folderId'];
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
    case DELETE_FOLDER:
      return initState;
    default:
      return state;
  }
};
