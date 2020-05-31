import { connect } from 'react-redux';
import { requestFilteredNoteList } from '../../../actions/noteActions';
import NoteFolderFilter from '../../../components/student/note/NoteFolderFilter';

export default connect(null, { requestFilteredNoteList })(NoteFolderFilter);
