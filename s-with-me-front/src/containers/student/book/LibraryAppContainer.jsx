import { connect } from 'react-redux';

import { requestMyBookList, FETCH_MY_BOOK_LIST } from '../../../actions/myBookPackActions';
import { FETCH_MY_FOLDER_LIST, requestFolderList } from '../../../actions/folderActions';

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

  return { myBookList, bookListLoading, folderLoading, folderList };
};

const mapDispatchToProps = {
  requestMyBookList,
  requestFolderList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryApp);
