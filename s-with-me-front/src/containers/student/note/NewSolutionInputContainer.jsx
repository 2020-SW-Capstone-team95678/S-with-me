import { connect } from 'react-redux';
import { setMyNewSolution } from '../../../actions/noteActions';
import NewSolutionInput from '../../../components/student/note/NewSolutionInput';

export default connect(null, { setMyNewSolution })(NewSolutionInput);
