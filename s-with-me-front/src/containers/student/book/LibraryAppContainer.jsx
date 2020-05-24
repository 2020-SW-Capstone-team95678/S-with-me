import { connect } from 'react-redux';
import { requestMyBookList, FETCH_MY_BOOK_LIST } from '../../../actions/myBookPackActions';
import LibraryApp from '../../../components/student/libarary/LibraryApp';

const mapStateToProps = state => {
  const { ids, entities, loadingState } = state.myBookList;
  const loading = loadingState[FETCH_MY_BOOK_LIST];
  const myBookList = ids.map(id => entities[id]);

  return { myBookList, loading };
};

const mapDispatchToProps = {
  requestMyBookList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryApp);
