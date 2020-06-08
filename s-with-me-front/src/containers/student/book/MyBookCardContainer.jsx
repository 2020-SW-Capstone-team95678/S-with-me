import { connect } from 'react-redux';
import { deleteMyBook, requestMyBookList } from '../../../actions/myBookPackActions';
import MyBookCard from '../../../components/student/libarary/MyBookCard';

export default connect(null, { deleteMyBook, requestMyBookList })(MyBookCard);
