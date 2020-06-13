import { connect } from 'react-redux';
import { requestFilteredMyBookList } from '../../../actions/myBookPackActions';
import LibrarySubjectTable from '../../../components/student/libarary/LibrarySubjectTable';

export default connect(null, { requestFilteredMyBookList })(LibrarySubjectTable);
