import { connect } from 'react-redux';
import { setNewSolvedDateTime, setNewIsRight } from '../../../actions/noteActions';
import NewScoringButton from '../../../components/student/note/NewScoringButton';

export default connect(null, { setNewSolvedDateTime, setNewIsRight })(NewScoringButton);
