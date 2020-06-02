import { connect } from 'react-redux';
import { setResolve } from '../../../actions/noteActions';
import NoteResolve from '../../../components/student/note/NoteResolve';

export default connect(null, { setResolve })(NoteResolve);
