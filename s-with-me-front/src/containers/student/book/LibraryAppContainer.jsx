import { connect } from 'react-redux';

import { requestMyBookList, FETCH_MY_BOOK_LIST } from '../../../actions/myBookPackActions';
import { FETCH_MY_FOLDER_LIST, requestFolderList } from '../../../actions/folderActions';
import {
  requestCurriculumList,
  FETCH_MY_CURRICULUM_LIST,
} from '../../../actions/curriculumActions';

import LibraryApp from '../../../components/student/libarary/LibraryApp';

const mapStateToProps = state => {
  const { ids, entities, loadingState } = state.myBookList;
  const bookListLoading = loadingState[FETCH_MY_BOOK_LIST];
  const myBookList = ids.map(id => entities[id]);

  const {
    ids: folderIds,
    entities: folderEntites,
    loadingState: folderLoadingState,
  } = state.folderList;
  const folderLoading = folderLoadingState[FETCH_MY_FOLDER_LIST];
  const folderList = folderIds.map(id => folderEntites[id]);

  const {
    ids: curriculumIds,
    entities: curriculumEntities,
    loadingState: curriculumLoadingState,
  } = state.curriculum;
  const curriculumLoading = curriculumLoadingState[FETCH_MY_CURRICULUM_LIST];
  const curriculumList = curriculumIds.map(id => curriculumEntities[id]);

  return {
    myBookList,
    bookListLoading,
    folderLoading,
    folderList,
    curriculumList,
    curriculumLoading,
  };
};

const mapDispatchToProps = {
  requestMyBookList,
  requestFolderList,
  requestCurriculumList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryApp);
