import { connect } from 'react-redux';
import { setSolutionType } from '../../../actions/myProblemActions';
import SolutionFilter from '../../../components/student/problem/SolutionFilter';

export default connect(null, { setSolutionType })(SolutionFilter);
