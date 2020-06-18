import { connect } from 'react-redux';
import { buyMyBook } from '../../actions/myBookPackActions';
import { updateSubscription } from '../../actions/userActions';
import BookPayInput from '../../components/student/bookstore/BookPayInput';

export default connect(null, { buyMyBook, updateSubscription })(BookPayInput);
