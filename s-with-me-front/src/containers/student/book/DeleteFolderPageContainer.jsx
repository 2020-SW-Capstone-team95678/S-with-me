import { connect } from 'react-redux';
import { deleteFolder, requestFolderList } from '../../../actions/folderActions';
import DeleteFolderPage from '../../../components/student/libarary/DeleteFolderPage';

export default connect(null, { deleteFolder, requestFolderList })(DeleteFolderPage);
