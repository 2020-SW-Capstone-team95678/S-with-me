import { handle } from 'redux-pack';
import {
  FETCH_NOTE_LIST,
  DELETE_NOTE,
  SET_RESOLVE,
  SET_MY_NEW_ANSWER,
  SET_NEW_IS_RIGHT,
  SET_NEW_SOLVED_DATE_TIME,
  FETCH_FILTERED_NOTE_LIST,
  SET_MY_NEW_TEXT_SOLUTION,
  SET_MY_NEW_IMAGE_SOLUTION,
  SET_MY_NEW_LINK_SOLUTION,
  SET_TEMP_SOLUTION_TYPE,
  SET_TEMP_IS_MATH,
  SET_NOTE_FILTER,
} from '../actions/noteActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_NOTE_LIST]: false,
    [DELETE_NOTE]: false,
  },
  errorState: {
    [FETCH_NOTE_LIST]: false,
    [DELETE_NOTE]: false,
  },
  pagination: {},
  pages: {},
  filter: {},
};

export default (state = initState, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case FETCH_FILTERED_NOTE_LIST:
    case DELETE_NOTE:
    case FETCH_NOTE_LIST: {
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
          if (type === FETCH_NOTE_LIST || type === FETCH_FILTERED_NOTE_LIST) {
            const { pageNumber, pageSize } = meta || {};
            const ids = data.map(entity => entity['noteId']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['noteId']]: entity,
              }),
              {},
            );
            return {
              ...prevState,
              ...loadingAndErrorState,
              ids,
              entities: { ...prevState.entities, ...entities },
              pagination: { number: pageNumber, size: pageSize },
              pages: { ...prevState.pages, [pageNumber]: ids },
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
    case SET_RESOLVE: {
      const { id, resolve } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], resolve },
        },
      };
    }
    case SET_MY_NEW_ANSWER: {
      const { id, myAnswer } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], myAnswer },
        },
      };
    }
    case SET_MY_NEW_TEXT_SOLUTION: {
      const { id, myNewTextSolution } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], myNewTextSolution },
        },
      };
    }
    case SET_MY_NEW_IMAGE_SOLUTION: {
      const { id, myNewImageSolution } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], myNewImageSolution },
        },
      };
    }
    case SET_MY_NEW_LINK_SOLUTION: {
      const { id, myNewLinkSolution } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], myNewLinkSolution },
        },
      };
    }
    case SET_NEW_IS_RIGHT: {
      const { id, isRight } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], isRight },
        },
      };
    }
    case SET_NEW_SOLVED_DATE_TIME: {
      const { id, solvedDateTime } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], solvedDateTime },
        },
      };
    }
    case SET_TEMP_SOLUTION_TYPE: {
      const { id, tempSolutionType } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], tempSolutionType },
        },
      };
    }
    case SET_TEMP_IS_MATH: {
      const { id, tempIsMath } = payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], tempIsMath },
        },
      };
    }
    case SET_NOTE_FILTER: {
      const { filterType, filterValue } = payload;
      return {
        ...state,
        filter: { type: filterType, value: filterValue },
      };
    }
    default:
      return state;
  }
};
