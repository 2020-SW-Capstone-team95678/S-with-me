import { connect } from 'react-redux';
import { requestBookList, requestAdBookList } from '../../actions/bookAction';
import BookstoreFilter from '../../components/student/bookstore/BookstoreFilter';

export default connect(null, { requestBookList, requestAdBookList })(BookstoreFilter);
