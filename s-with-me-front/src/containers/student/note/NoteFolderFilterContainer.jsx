import { connect } from 'react-redux';
import { requestFilteredNoteList, setNoteFilter } from '../../../actions/noteActions';
import NoteFolderFilter from '../../../components/student/note/NoteFolderFilter';

export default connect(null, { requestFilteredNoteList, setNoteFilter })(NoteFolderFilter);
