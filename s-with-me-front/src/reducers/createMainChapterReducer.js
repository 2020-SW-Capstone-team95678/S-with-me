import { handle } from 'redux-pack';
import { CREATE_MAIN_CHAPTER } from '../actions/createMainChapterAction';

const initState = {
  ids: [],
  entity: {},
  loadingState: {
    [CREATE_MAIN_CHAPTER]: false,
  },
  errorState: {
    [CREATE_MAIN_CHAPTER]: false,

  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_MAIN_CHAPTER:{
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
          
          return {
            ...prevState,
            ...loadingAndErrorState,
            entity: data,
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
