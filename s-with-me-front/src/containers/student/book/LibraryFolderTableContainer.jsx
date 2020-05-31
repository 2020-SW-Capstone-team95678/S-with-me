import { connect } from 'react-redux';
import { moveMyBook } from '../../../actions/myBookPackActions';
import LibraryFolderTable from '../../../components/student/libarary/LibraryFolderTable';

export default connect(null, { moveMyBook })(LibraryFolderTable);
