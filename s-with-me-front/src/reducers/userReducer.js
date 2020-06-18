import {
  SET_USER,
  CREATE_USER,
  CHECK_ID_DUPLICATION,
  UPDATE_SUBSCRIPTION,
} from '../actions/userActions';
import { handle } from 'redux-pack';

const initState = {
  entity: {},
  loadingState: {
    [SET_USER]: false,
    [CREATE_USER]: false,
    [UPDATE_SUBSCRIPTION]: false,
  },
  errorState: {
    [SET_USER]: false,
    [CREATE_USER]: false,
    [UPDATE_SUBSCRIPTION]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SUBSCRIPTION:
    case CREATE_USER:
    case CHECK_ID_DUPLICATION:
    case SET_USER: {
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
          if (type === SET_USER || CHECK_ID_DUPLICATION) {
            return {
              ...prevState,
              ...loadingAndErrorState,
              entity: data,
            };
          } else if (type === UPDATE_SUBSCRIPTION) {
            const { data } = payload;
            return {
              ...prevState,
              ...loadingAndErrorState,
              entity: { ...prevState.entity, isSubscribing: data.isSubscribing },
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
