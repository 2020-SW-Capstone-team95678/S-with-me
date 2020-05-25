import { connect } from 'react-redux';
import { requestFolderList, createFolder } from '../../../actions/folderActions';
import CreateFolderPage from '../../../components/student/libarary/CreateFolderPage';

export default connect(null, { createFolder, requestFolderList })(CreateFolderPage);
