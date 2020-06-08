import { connect } from 'react-redux';
import { requestFilteredNoteList, setNoteFilter } from '../../../actions/noteActions';
import NoteSubjectFilter from '../../../components/student/note/NoteSubjectFilter';

export default connect(null, { requestFilteredNoteList, setNoteFilter })(NoteSubjectFilter);
