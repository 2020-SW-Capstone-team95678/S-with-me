import { connect } from 'react-redux';
import { setMyNewAnswer } from '../../../actions/noteActions';
import NewAnswerInput from '../../../components/student/note/NewAnswerInput';

export default connect(null, { setMyNewAnswer })(NewAnswerInput);
