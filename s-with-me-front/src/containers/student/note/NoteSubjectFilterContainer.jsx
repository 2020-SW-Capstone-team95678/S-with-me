import { connect } from 'react-redux';
import { requestFilteredNoteList } from '../../../actions/noteActions';
import NoteSubjectFilter from '../../../components/student/note/NoteSubjectFilter';

export default connect(null, { requestFilteredNoteList })(NoteSubjectFilter);
