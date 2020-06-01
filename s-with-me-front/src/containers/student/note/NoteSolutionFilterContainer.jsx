import { connect } from 'react-redux';
import { setTempSolutionType as setSolutionType } from '../../../actions/noteActions';
import SolutionFilter from '../../../components/student/problem/SolutionFilter';

export default connect(null, { setSolutionType })(SolutionFilter);
