import { connect } from 'react-redux';
import { setMySolution } from '../../../actions/myProblemActions';
import SolutionInput from '../../../components/student/problem/SolutionInput';

const mapDispatchToProps = dispatch => {
  return {
    setMySolution: (id, mySolution) => dispatch(setMySolution(id, mySolution)),
  };
};

export default connect(null, mapDispatchToProps)(SolutionInput);
