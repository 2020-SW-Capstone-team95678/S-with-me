import { connect } from 'react-redux';
import ProblemView from '../../../components/student/problem/ProblemView';
import { updateMyProblem } from '../../../actions/myProblemPackActions';

export default connect(null, { updateMyProblem })(ProblemView);
