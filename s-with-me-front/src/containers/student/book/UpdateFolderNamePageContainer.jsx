import { connect } from 'react-redux';
import { requestFolderList, updateFolderName } from '../../../actions/folderActions';
import UpdateFolderNamePage from '../../../components/student/libarary/UpdateFolderNamePage';

export default connect(null, { updateFolderName, requestFolderList })(UpdateFolderNamePage);
