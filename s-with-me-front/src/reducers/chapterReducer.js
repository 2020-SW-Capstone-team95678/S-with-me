import { handle } from 'redux-pack';
import { FETCH_CHAPTER_LIST } from '../actions/chapterActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [FETCH_CHAPTER_LIST]: false,
  },
  errorState: {
    [FETCH_CHAPTER_LIST]: false,
  },
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CHAPTER_LIST: {
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
          if (type === FETCH_CHAPTER_LIST) {
            const ids = data.map(
              ({ mainChapterResponseDto: mainChapter }) => mainChapter['mainChapterId'],
            );
            const entities = data.reduce(
              (
                finalEntities,
                { mainChapterResponseDto: mainChapter, subChapterResponseDtoList: subChapters },
              ) => ({
                ...finalEntities,
                [mainChapter['mainChapterId']]: { mainChapter, subChapters },
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
