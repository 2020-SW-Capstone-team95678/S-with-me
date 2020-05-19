import { connect } from 'react-redux';
import ProblemView from '../../../components/student/problem/ProblemView';
import { createSolvedData } from '../../../actions/myProblemActions';

export default connect(null, { createSolvedData })(ProblemView);
