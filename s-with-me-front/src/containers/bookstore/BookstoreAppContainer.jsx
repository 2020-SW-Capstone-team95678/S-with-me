import { connect } from 'react-redux';
import { requestBookList, requestAdBookList } from '../../actions/bookAction';
import BookstoreApp from '../../components/student/bookstore/BookstoreApp';

const mapStateToProps = state => {
  const { generalIds, generalEntities, adIds, adEntities } = state.book;
  const bookList = generalIds.map(id => generalEntities[id]);
  const adBookList = adIds.map(id => adEntities[id]);

  return { bookList, adBookList };
};

export default connect(mapStateToProps, { requestBookList, requestAdBookList })(BookstoreApp);
