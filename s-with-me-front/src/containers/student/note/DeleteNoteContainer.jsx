import { connect } from 'react-redux';
import { deleteNote, requestNoteList } from '../../../actions/noteActions';
import DeleteNote from '../../../components/student/note/DeleteNote';

export default connect(null, { deleteNote, requestNoteList })(DeleteNote);
