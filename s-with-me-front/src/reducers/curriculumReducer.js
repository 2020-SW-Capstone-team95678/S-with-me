import { handle } from 'redux-pack';
import {
  FETCH_MY_CURRICULUM_LIST,
  CREATE_CURRICULLUM,
  UPDATE_CURRICULUM,
} from '../actions/curriculumActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_MY_CURRICULUM_LIST]: false,
    [CREATE_CURRICULLUM]: false,
    [UPDATE_CURRICULUM]: false,
  },
  errorState: {
    [FETCH_MY_CURRICULUM_LIST]: false,
    [CREATE_CURRICULLUM]: false,
    [UPDATE_CURRICULUM]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_CURRICULUM:
    case CREATE_CURRICULLUM:
    case FETCH_MY_CURRICULUM_LIST: {
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
          if (type === FETCH_MY_CURRICULUM_LIST) {
            const ids = data.map(entity => entity['curriculumId']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['curriculumId']]: entity,
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
