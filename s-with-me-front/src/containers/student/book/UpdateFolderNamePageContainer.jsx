import { connect } from 'react-redux';
import { requestFolderList, updateFolderName } from '../../../actions/folderActions';
import CreateFolderPage from '../../../components/student/libarary/CreateFolderPage';

export default connect(null, { updateFolderName, requestFolderList })(CreateFolderPage);
