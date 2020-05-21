import { connect } from 'react-redux';
import ProblemView from '../../../components/student/problem/ProblemView';
import { updateMyProblem, UPDATE_MY_PROBLEM } from '../../../actions/myProblemPackActions';

const mapStateToProps = state => {
  const { loadingState } = state.myProblemList;
  const loading = loadingState[UPDATE_MY_PROBLEM];
  return { loading };
};
export default connect(mapStateToProps, { updateMyProblem })(ProblemView);
