import { CREATE_BOOK, FETCH_AD_BOOK_LIST, FETCH_BOOK_LIST } from '../actions/bookAction';
import { handle } from 'redux-pack';

const initState = {
  generalIds: [],
  generalEntities: {},
  adIds: [],
  adEntities: {},
  entity: {},
  loadingState: {
    [CREATE_BOOK]: false,
    [FETCH_AD_BOOK_LIST]: false,
    [FETCH_BOOK_LIST]: false,
  },
  errorState: {
    [CREATE_BOOK]: false,
    [FETCH_AD_BOOK_LIST]: false,
    [FETCH_BOOK_LIST]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_BOOK_LIST:
    case FETCH_AD_BOOK_LIST:
    case CREATE_BOOK: {
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
          if (type === CREATE_BOOK) {
            return {
              ...prevState,
              ...loadingAndErrorState,
              entity: data,
            };
          } else if (type === FETCH_BOOK_LIST || type === FETCH_AD_BOOK_LIST) {
            const ids = data.map(entity => entity['bookId']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['bookId']]: entity,
              }),
              {},
            );
            if (type === FETCH_BOOK_LIST) {
              return {
                ...prevState,
                ...loadingAndErrorState,
                generalIds: ids,
                generalEntities: { ...prevState.generalEntities, ...entities },
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
    default:
      return state;
  }
};
