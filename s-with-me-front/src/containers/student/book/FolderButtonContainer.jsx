import { connect } from 'react-redux';
import { requestFilteredMyBookList } from '../../../actions/myBookPackActions';
import FolderButton from '../../../components/student/libarary/FolderButton';

export default connect(null, { requestFilteredMyBookList })(FolderButton);
