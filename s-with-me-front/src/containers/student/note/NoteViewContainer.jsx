import { connect } from 'react-redux';
import { setResolve, updateNote } from '../../../actions/noteActions';
import NoteView from '../../../components/student/note/NoteView';

export default connect(null, { setResolve, updateNote })(NoteView);
