import { connect } from 'react-redux';
import { deleteFolder, requestFolderList } from '../../../actions/folderActions';
import { requestMyBookList } from '../../../actions/myBookPackActions';
import DeleteFolderPage from '../../../components/student/libarary/DeleteFolderPage';

export default connect(null, { deleteFolder, requestFolderList, requestMyBookList })(
  DeleteFolderPage,
);
