import { connect } from 'react-redux';
import { setResolve } from '../../../actions/noteActions';
import NoteView from '../../../components/student/note/NoteView';

export default connect(null, { setResolve })(NoteView);
