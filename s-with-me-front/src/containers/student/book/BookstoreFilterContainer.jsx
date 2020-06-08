import { connect } from 'react-redux';
import {
  setBookstoreFilter,
  requestBookList,
  requestAdBookList,
  requestSearchResultList,
} from '../../../actions/bookAction';
import BookstoreFilter from '../../../components/student/bookstore/BookstoreFilter';

export default connect(null, {
  setBookstoreFilter,
  requestBookList,
  requestAdBookList,
  requestSearchResultList,
})(BookstoreFilter);
