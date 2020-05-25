import { connect } from 'react-redux';
import { CREATE_BOOK, createBook} from '../../actions/bookAction';
import AddBook from '../../components/publisher/addBook/AddBook';

const mapDispatchToProps = state => {
  const { loadingState} = state.book;
  const loading = loadingState[CREATE_BOOK];
  return { loading};
};

export default connect(mapDispatchToProps, { createBook })(AddBook);
