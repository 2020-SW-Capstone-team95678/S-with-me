import { connect } from 'react-redux';
import { moveMyBook } from '../../../actions/myBookPackActions';
import LibraryFolderTable from '../../../components/student/libarary/LibraryFolderTable';
import { requestFolderList, updateFolderName } from '../../../actions/folderActions';
export default connect(null, { moveMyBook, requestFolderList, updateFolderName })(
  LibraryFolderTable,
);
