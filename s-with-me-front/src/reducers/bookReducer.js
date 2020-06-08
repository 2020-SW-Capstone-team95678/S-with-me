import {
  FETCH_AD_BOOK_LIST,
  FETCH_BOOK_LIST,
  SET_BOOKSTORE_FILTER,
  FETCH_SEARCH_RESULT_LIST,
} from '../actions/bookAction';
import { handle } from 'redux-pack';

const initState = {
  generalIds: [],
  generalEntities: {},
  adIds: [],
  adEntities: {},
  entity: {},
  loadingState: {
    [FETCH_AD_BOOK_LIST]: false,
    [FETCH_BOOK_LIST]: false,
    [FETCH_SEARCH_RESULT_LIST]: false,
  },
  errorState: {
    [FETCH_AD_BOOK_LIST]: false,
    [FETCH_BOOK_LIST]: false,
    [FETCH_SEARCH_RESULT_LIST]: false,
  },
  pagination: {},
  pages: {},
  filter: {},
};

export default (state = initState, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case FETCH_SEARCH_RESULT_LIST:
    case FETCH_BOOK_LIST:
    case FETCH_AD_BOOK_LIST: {
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
          if (
            type === FETCH_BOOK_LIST ||
            type === FETCH_AD_BOOK_LIST ||
            type === FETCH_SEARCH_RESULT_LIST
          ) {
            const ids = data.map(entity => entity['bookId']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['bookId']]: entity,
              }),
              {},
            );
            if (type === FETCH_BOOK_LIST || type === FETCH_SEARCH_RESULT_LIST) {
              const { pageNumber, pageSize } = meta || {};
              return {
                ...prevState,
                ...loadingAndErrorState,
                generalIds: ids,
                generalEntities: { ...prevState.generalEntities, ...entities },
                pagination: { number: pageNumber, size: pageSize },
                pages: { ...prevState.pages, [pageNumber]: ids },
              };
            } else {
              return {
                ...prevState,
                ...loadingAndErrorState,
                adIds: ids,
                adEntities: { ...prevState.adEntities, ...entities },
              };
            }
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
    case SET_BOOKSTORE_FILTER: {
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
