import { SET_USER, CREATE_USER } from '../actions/userActions';
import { handle } from 'redux-pack';

const initState = {
  entity: {},
  loadingState: {
    [SET_USER]: false,
    [CREATE_USER]: false,
  },
  errorState: {
    [SET_USER]: false,
    [CREATE_USER]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
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
            loadingState: { ...prevState, [type]: false },
            errorState: { ...prevState, [type]: false },
          };
          if (type === SET_USER) {
            return {
              ...prevState,
              ...loadingAndErrorState,
              entity: data,
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
