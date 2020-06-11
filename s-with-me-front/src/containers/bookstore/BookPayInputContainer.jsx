import { connect } from 'react-redux';
import { buyMyBook } from '../../actions/myBookPackActions';
import BookPayInput from '../../components/student/bookstore/BookPayInput';

export default connect(null, { buyMyBook })(BookPayInput);
