import { connect } from 'react-redux';
import { requestFolderList, createFolder } from '../../../actions/folderActions';
import LibraryFilter from '../../../components/student/libarary/LibraryFilter';

export default connect(null, { createFolder, requestFolderList })(LibraryFilter);
